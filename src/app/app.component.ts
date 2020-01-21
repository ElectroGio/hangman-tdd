import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hangman-tdd';
  intentos = 0;
  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  palabra = 'AGUACATE';
  palabraOculta = '';

  gano = false;
  perdio = false;

  constructor() {
    this.palabraOculta = '_ '.repeat( this.palabra.length );
  }

  comprobar( letra ) {
    this.existeLetra(letra);
   }

  verificaGane() {
  
  }

  existeLetra( letra ) {
    if ( this.palabra.indexOf( letra ) >= 0) {
      console.log('La letra ' + letra + ' existe');
    } else {
      console.log('La letra ' + letra + ' no existe');
      this.intentos++;
    }
  }



}
