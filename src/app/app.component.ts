import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';
import { ZoodiacoComponent } from './formulario/zoodiaco/zoodiaco.component';
import { FormEmpleadosComponent } from './formulario/form-empleados/form-empleados.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Ejemplo1Component,
    ZoodiacoComponent,
    FormEmpleadosComponent,  // FormEmpleadosComponent como independiente
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSegundo';

  mostrarEjemplo1 = false;
  mostrarZoodiaco = false;
  mostrarEmpleados = false;

  mostrarComponente(componente: string) {
    this.mostrarEjemplo1 = componente === 'ejemplo1';
    this.mostrarZoodiaco = componente === 'zoodiaco';
    this.mostrarEmpleados = componente === 'form-empleados';
  }
}
