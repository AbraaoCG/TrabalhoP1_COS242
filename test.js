const fs = require('fs');

let data = fs.readFileSync(inputPath, 'utf8'); // Faz a leitura do arquivo de input
data = data.split(/\r\n/); // Armazena cada linha do arquivo em um vetor

// Define num. de vértices
const n = parseInt(data[0]);
// Define num. de arestas
const m = data.length - 1; // O número de arestas será o tamanho do vetor menos 1 (linha que informa o número de vértices do grafo)

// Define estrutura de dados com as informações do arquivo de entrada. Será formada por um vetor que o índice representa o vértice e 
// cada elemento será uma lista encadeada com os vizinhos do vértice
let dataStruct = new Array(n);
for (let i = 0 ; i < n ; i++){
    dataStruct[i] = new LinkedList();
}

for (let i = 1; i < this.m + 1 ; i++){
    let v1 = parseInt(this.data[i][0]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz
    let v2 = parseInt(this.data[i][2]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz