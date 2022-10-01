const fs = require('fs');
function adjacency_matrix() {
    try {
        let data = fs.readFileSync('input.txt', 'utf8');

        data = data.split(/\r\n/)
        n = parseInt(data[0])

        console.log(n)

    } catch (err) {
        console.error(err);
    }
}

adjacency_matrix()

const fs = require('fs');

class Graph { // Classe Base para Grafos
    constructor(inputPath, graphType) {
        [this.n, this.m] = this.readInput(inputPath);
    } 

    readInput(inputPath) {
        let data = fs.readFileSync(inputPath, 'utf8'); // Faz a leitura do arquivo de input
        data = data.split(/\r\n/); // Armazena cada linha do arquivo em um vetor

        // Define num. de vértices
        n = parseInt(data[0])
        // Define num. de arestas
        m = len(data) - 1 // O número de arestas será o tamanho do vetor menos 1 (linha que informa o número de vértices do grafo)
        
        return [n, m];
    }
    
    
}

const newGraph = new Graph('input.txt', 1)
console.log(newGraph.m)