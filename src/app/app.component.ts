import { Component } from '@angular/core';
import {WordProvider } from './services/wordProvider.service';

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
 

  constructor(private wordProvider: WordProvider) {
    this.palabra = wordProvider.proveerPalabra();
    this.palabraOculta = '_ '.repeat( this.palabra.length );
    
  }

  comprobar( letra ) {
    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');
    for (let i = 0; i < this.palabra.length; i++) {
      if ( this.palabra[i] === letra ) {
        palabraOcultaArr[i] = letra;
      }
      this.palabraOculta = palabraOcultaArr.join(' ');
    }
    this.verificaGane();
   }

  verificaGane() {
    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if ( this.intentos >= 9 ){
      this.perdio = true;
    }

    if ( palabraEvaluar === this.palabra ) {
      this.gano = true;
    }
  
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
