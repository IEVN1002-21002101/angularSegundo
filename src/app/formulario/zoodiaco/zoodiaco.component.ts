import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar ngIf

@Component({
  selector: 'app-zoodiaco',
  standalone: true, // Hacerlo standalone
  templateUrl: './zoodiaco.component.html',
  styleUrls: ['./zoodiaco.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // Asegúrate de importar CommonModule
})
export class ZoodiacoComponent implements OnInit {
  formulario!: FormGroup;
  resultado: string = '';
  imagenSigno: string = '';
  
  constructor() {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidop: new FormControl('', Validators.required),
      apellidom: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required)
    });
  }

  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    if (
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }

    return edad;
  }

  calcularZodiacoChino(anio: number): { signo: string, imagenUrl: string } {
    const signosChinos = [
      { signo: 'Rata', imagenUrl: 'https://roedoresdomesticos.com/wp-content/uploads/2017/06/rata-featured-roedoresdomesticos.jpg' },
      { signo: 'Buey', imagenUrl: 'https://png.pngtree.com/background/20230525/original/pngtree-an-oxen-in-a-field-with-large-horns-behind-him-picture-image_2735138.jpg' },
      { signo: 'Tigre', imagenUrl: 'http://3.bp.blogspot.com/-PeSn1hz8iZw/UVrQ7nS3_HI/AAAAAAAAAVs/U_YCBFrMa-w/s1600/animal_020.jpg' },
      { signo: 'Conejo', imagenUrl: 'https://3.bp.blogspot.com/-U8PDcjpIDaQ/Ubn9mMq6VpI/AAAAAAAAAkY/akchnltxdnQ/s1600/conejos.jpg' },
      { signo: 'Dragón', imagenUrl: 'http://getwallpapers.com/wallpaper/full/6/9/1/1060212-red-dragon-wallpapers-2005x1317-ipad.jpg' },
      { signo: 'Serpiente', imagenUrl: 'https://deserpientes.net/wp-content/uploads/v%C3%ADbora-de-arbusto.jpg' },
      { signo: 'Caballo', imagenUrl: 'http://1.bp.blogspot.com/-xQeXdEgGASI/UZXsAG8nXQI/AAAAAAAABYA/Z6FaH9_RXns/s1600/CABALLO%2BESPLENDIDO%2BFONDO%2BVERDE.jpg' },
      { signo: 'Cabra', imagenUrl: 'https://cdn.pixabay.com/photo/2017/09/10/23/38/goat-2737355_1280.jpg' },
      { signo: 'Mono', imagenUrl: 'https://encuriosidades.com/wp-content/uploads/2020/07/Curiosidades-de-los-monos.jpg' },
      { signo: 'Gallo', imagenUrl: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Gallo_de_corral_(view_large).jpg' },
      { signo: 'Perro', imagenUrl: 'https://www.elmueble.com/medio/2023/03/09/perro-de-raza-rottweiler_9f7a22a7_230309180127_900x900.jpg' },
      { signo: 'Cerdo', imagenUrl: 'https://www.partesdel.com/wp-content/uploads/Cabeza-del-cerdo.jpg' }
    ];
    const indice = (anio - 1900) % 12;
    return signosChinos[indice];
  }

  imprimirResultado(): void {
    if (this.formulario.valid) {
      const fechaNacimiento = new Date(this.formulario.get('fechaNacimiento')?.value);
      const anioNacimiento = fechaNacimiento.getFullYear();
      const edad = this.calcularEdad(fechaNacimiento);
      const { signo, imagenUrl } = this.calcularZodiacoChino(anioNacimiento);

      this.resultado = `Hola ${this.formulario.get('nombre')?.value} ${this.formulario.get('apellidop')?.value} ${this.formulario.get('apellidom')?.value}, tienes ${edad} años y tu signo zodiacal chino es ${signo}.`;
      this.imagenSigno = imagenUrl;
    }
  }
}
