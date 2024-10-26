import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEmpleadosComponent } from './form-empleados.component';

describe('FormEmpleadosComponent', () => {
  let component: FormEmpleadosComponent;
  let fixture: ComponentFixture<FormEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate payments correctly', () => {
    const result30 = component.calcularPagos(30);
    expect(result30.pagoHorasNormales).toBe(30 * 70);
    expect(result30.pagoHorasExtras).toBe(0);
    expect(result30.totalPago).toBe(30 * 70);

    const result50 = component.calcularPagos(50);
    expect(result50.pagoHorasNormales).toBe(40 * 70);
    expect(result50.pagoHorasExtras).toBe(10 * 140);
    expect(result50.totalPago).toBe(40 * 70 + 10 * 140);
  });

  it('should add an employee when "Registrar" is clicked', () => {
    const form = component.formularioEmpleado;
    form.get('matricula')?.setValue('1234');
    form.get('nombre')?.setValue('Juan');
    form.get('correo')?.setValue('juan@example.com');
    form.get('edad')?.setValue(25);
    form.get('horasTrabajadas')?.setValue(42);

    component.agregarEmpleado();

    expect(component.empleados.length).toBe(1);
    expect(component.empleados[0].matricula).toBe('1234');
    expect(component.empleados[0].nombre).toBe('Juan');
    expect(component.empleados[0].correo).toBe('juan@example.com');
    expect(component.empleados[0].edad).toBe(25);
    expect(component.empleados[0].horasTrabajadas).toBe(42);
    expect(component.empleados[0].pagoHorasNormales).toBe(40 * 70);
    expect(component.empleados[0].pagoHorasExtras).toBe(2 * 140);
    expect(component.empleados[0].totalPago).toBe(40 * 70 + 2 * 140);
  });

  it('should display the table when "Imprimir" is clicked', () => {
    component.mostrarTabla();
    expect(component.tablaVisible).toBeTrue();
  });

  it('should load an employee into the form for modification', () => {
    const form = component.formularioEmpleado;
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 42, pagoHorasNormales: 40 * 70, pagoHorasExtras: 2 * 140, totalPago: 40 * 70 + 2 * 140 }
    ];

    component.modificarEmpleado(0);

    expect(form.get('matricula')?.value).toBe('1234');
    expect(form.get('nombre')?.value).toBe('Juan');
    expect(form.get('correo')?.value).toBe('juan@example.com');
    expect(form.get('edad')?.value).toBe(25);
    expect(form.get('horasTrabajadas')?.value).toBe(42);
  });

  it('should update an employee when modified', () => {
    const form = component.formularioEmpleado;
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 42, pagoHorasNormales: 40 * 70, pagoHorasExtras: 2 * 140, totalPago: 40 * 70 + 2 * 140 }
    ];

    component.modificarEmpleado(0);

    form.get('horasTrabajadas')?.setValue(45);
    component.agregarEmpleado();

    expect(component.empleados[0].horasTrabajadas).toBe(45);
    expect(component.empleados[0].pagoHorasNormales).toBe(40 * 70);
    expect(component.empleados[0].pagoHorasExtras).toBe(5 * 140);
    expect(component.empleados[0].totalPago).toBe(40 * 70 + 5 * 140);
  });

  it('should delete an employee', () => {
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 42, pagoHorasNormales: 40 * 70, pagoHorasExtras: 2 * 140, totalPago: 40 * 70 + 2 * 140 }
    ];

    component.eliminarEmpleado(0);

    expect(component.empleados.length).toBe(0);
  });
});
