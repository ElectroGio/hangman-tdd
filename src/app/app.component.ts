import { Component } from '@angular/core';
import {WordProvider } from './services/wordProvider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hangman-tdd';
  tries = 0;
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  word = 'AGUACATE';
  hiddenWord = '';
  win = false;
  lost = false;
 

  constructor(private wordProvider: WordProvider) {
    this.word = wordProvider.getNewWord();
    this.hiddenWord = '_ '.repeat( this.word.length );
    
  }

  verify( letter ) {
    console.log("di clic a "+letter)
    this.letterExists(letter);
    const hiddenWordArr = this.hiddenWord.split(' ');
    for (let i = 0; i < this.word.length; i++) {
      if ( this.word[i] === letter ) {
        hiddenWordArr[i] = letter;
      }
      this.hiddenWord = hiddenWordArr.join(' ');
    }
    this.verifyWin();
   }

  verifyWin() {
    const wordArr = this.hiddenWord.split(' ');
    const wordEvaluate = wordArr.join('');

    if ( this.tries >= 9 ){
      this.lost = true;
    }

    if ( wordEvaluate === this.word ) {
      this.win = true;
    }
  
  }

  letterExists( letter ) {
    if ( this.word.indexOf( letter ) >= 0) {
      console.log('La letra ' + letter + ' existe');
    } else {
      console.log('La letra ' + letter + ' no existe');
      this.tries++;
    }
  }



}
