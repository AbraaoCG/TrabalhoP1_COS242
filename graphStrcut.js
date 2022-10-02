const fs = require('fs');

class GraphStruct { // Classe Base para Grafos
    constructor(inputPath) {
        [this.n, this.m, this.degreeArray, this.degreeSum] = this.readInput(inputPath);
        [this.maxDegree, this.minDegree, this.averageDegree, this.medianDegree] = getDegreeInfo();
    }

    readInput(inputPath) {
        let data = fs.readFileSync(inputPath, 'utf8'); // Faz a leitura do arquivo de input
        data = data.split(/\r\n/); // Armazena cada linha do arquivo em um vetor
    
        // Define num. de vértices
        const n = parseInt(data[0]);
        // Define num. de arestas
        const m = data.length - 1; // O número de arestas será o tamanho do vetor menos 1 (linha que informa o número de vértices do grafo)
        
        // Inicializa variável com a soma dos graus
        let degreeSum = 0;
        // Inializa variáveis com o 
        // Inicializa vetor com o grau de cada vértice e variáveis com índice máximo e mínimo
        let degreeArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            degreeArray[i] = 0;
        }

        // Preenche Matrix, vetor de graus e a soma dos graus
        for (let i = 1; i < this.m + 1 ; i++){
            let v1 = parseInt(this.data[i][0]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz
            let v2 = parseInt(this.data[i][2]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz
            
            degreeArray[v1] += 1;
            degreeArray[v2] += 1;
            degreeSum += 2;
        }

        return [n, m, degreeArray, degreeSum]
    }

    getDegreeInfo() {
        // Tornar mais eficiente: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
        // sort(Object[]) is based on the TimSort algorithm, giving us a time complexity of O(n log(n)).
        const sortedDegreeArray = this.degreeArray.sort(function(a, b) {
            return a - b;
        });

        const maxDegree = sortedDegreeArray[this.n - 1]; // Subtraimos 1 porque o índice da lista inicia pelo zero
        const minDegree = sortedDegreeArray[0];
        const averageDegree = this.degreeSum / this.n;

        let medianDegree;
        const i = Math.floor(sortedDegreeArray.length / 2); // Divide o comprimento do array por 2. Se for decimal, arredonda para baixo
        if (this.n % 2 === 0) { // Se o número de elementos é par
            // A mediana será a soma dos dois índices ao centro dividido por 2
            medianDegree = ((sortedDegreeArray[i]) + (sortedDegreeArray[i - 1])) / 2; 
        } else { // Se é ímpar
            medianDegree = sortedDegreeArray[i]; // A mediana será igual ao elemento do centro
        }; 

        return [maxDegree, minDegree, averageDegree, medianDegree]
    }
}

module.exports = GraphStruct; // Export class