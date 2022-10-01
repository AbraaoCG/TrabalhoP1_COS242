const fs = require('fs');

class GraphStruct { // Classe Base para Grafos
    constructor(inputPath) {
        [this.n, this.m, this.data] = this.readInput(inputPath)
    }

    readInput(inputPath) {
        let data = fs.readFileSync(inputPath, 'utf8'); // Faz a leitura do arquivo de input
        data = data.split(/\r\n/); // Armazena cada linha do arquivo em um vetor
    
        // Define num. de vértices
        const n = parseInt(data[0]);
        // Define num. de arestas
        const m = data.length - 1; // O número de arestas será o tamanho do vetor menos 1 (linha que informa o número de vértices do grafo)
    
        return [n, m, data];
    }
}


module.exports = GraphStruct; // Export class