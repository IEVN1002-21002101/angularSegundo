import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";
import { ZoodiacoComponent } from './formulario/zoodiaco/zoodiaco.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Ejemplo1Component, ZoodiacoComponent],  // Asegúrate de agregar CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSegundo';
 
  mostrarEjemplo1 = false;
  mostrarZoodiaco = false;
 
  mostrarComponente(componente: string) {
    this.mostrarEjemplo1 = componente === 'ejemplo1';
    this.mostrarZoodiaco = componente === 'zoodiaco';
  }
}