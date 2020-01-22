export class WordProvider{

    palabras = ['HOJA', 'CUADERNO', 'COMPUTADOR', 'LECHE', 'ARROZ'];

    constructor(){}

    proveerPalabra(){
        var pos = Math.floor(Math.random() * Math.floor(this.palabras.length));
        return this.palabras[pos];
    }
}