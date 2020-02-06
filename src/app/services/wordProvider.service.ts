export class WordProvider {
    words = ['HOJA', 'CUADERNO', 'COMPUTADOR', 'LECHE', 'ARROZ'];

    constructor() {}

    getNewWord() {
      const pos = Math.floor(Math.random() * Math.floor(this.words.length));
      return this.words[pos];
    }
}
