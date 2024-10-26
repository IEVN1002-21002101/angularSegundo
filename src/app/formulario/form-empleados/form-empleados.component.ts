import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {
  formularioEmpleado: FormGroup;
  empleados: any[] = [];
  tablaVisible = false;
  indiceModificacion: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioEmpleado = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]],
      pagoHorasNormales: [{ value: 0, disabled: true }],
      pagoHorasExtras: [{ value: 0, disabled: true }],
      totalPago: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit() {
    this.cargarEmpleados();
  }

  agregarEmpleado() {
    const nuevoEmpleado = this.formularioEmpleado.getRawValue();
    const { pagoHorasNormales, pagoHorasExtras, totalPago } = this.calcularPagos(nuevoEmpleado.horasTrabajadas);

    nuevoEmpleado.pagoHorasNormales = pagoHorasNormales;
    nuevoEmpleado.pagoHorasExtras = pagoHorasExtras;
    nuevoEmpleado.totalPago = totalPago;

    if (this.indiceModificacion !== null) {
      this.empleados[this.indiceModificacion] = nuevoEmpleado;
      this.indiceModificacion = null;
    } else {
      this.empleados.push(nuevoEmpleado);
    }

    this.guardarEmpleados();
    this.formularioEmpleado.reset();
  }

  mostrarTabla() {
    this.tablaVisible = true;
  }

  modificarEmpleado(index: number) {
    this.formularioEmpleado.patchValue(this.empleados[index]);
    this.indiceModificacion = index;
  }

  eliminarEmpleado(index: number) {
    this.empleados.splice(index, 1);
    this.guardarEmpleados();
  }

  calcularPagos(horas: number) {
    if (!horas) horas = 0;
    let pagoHorasNormales = horas > 40 ? 40 * 70 : horas * 70;
    let pagoHorasExtras = horas > 40 ? (horas - 40) * 140 : 0;
    let totalPago = pagoHorasNormales + pagoHorasExtras;

    this.formularioEmpleado.patchValue({
      pagoHorasNormales,
      pagoHorasExtras,
      totalPago
    });

    return { pagoHorasNormales, pagoHorasExtras, totalPago };
  }

  calcularTotalGeneral() {
    return this.empleados.reduce((acc, empleado) => acc + (empleado.totalPago || 0), 0);
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }
}
