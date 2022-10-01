const GraphStruct = require('./graphStrcut');

class AdjacencyMatrix extends GraphStruct { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
        [this.matrix, this.degreeArray, this.degreeSum] = this.buildStruct();
    } 

    buildStruct() {
        // Inicializa matriz de zeros com 2 iterações (linha x Coluna)
        let matrix =  new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            matrix[i] = new Array(this.n)
            for (let j = 0 ; j < this.n ; j++){
                matrix[i][j] = 0;
            } 
        }
        // Inicializa variável com a soma dos graus
        let degreeSum = 0;
        // Inicializa vetor com o grau de cada vértice e variáveis com índice máximo e mínimo
        let degreeArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            degreeArray[i] = 0;
        }
        
        // Preenche Matrix, vetor de graus e a soma dos graus
        for (let i = 1; i < this.m + 1 ; i++){
            let v1 = parseInt(this.data[i][0]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz
            let v2 = parseInt(this.data[i][2]) - 1; // Subtrai 1, pois vértice x equivale a (x-1) na matriz
            matrix[v1][v2] = 1; // Seta v1 --> v2
            matrix[v2][v1] = 1; // Seta v2 --> v1
            
            degreeArray[v1] += 1;
            degreeArray[v2] += 1;
            degreeSum += 2;
        }        
        return [matrix, degreeArray, degreeSum];
    }

    getDegreeInfo() {
        // Tornar mais eficiente: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
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

        return [sortedDegreeArray, maxDegree, minDegree, averageDegree, medianDegree]
    }

    bfs(s) {
        // Desmarcar todos os vértices
        let markupVector = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            markupVector[i] = 0;
        }

        // Definir fila Q vazia --> Precisa ser com fila???: https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript?page=1&tab=scoredesc#tab-top
        let q = [];
        // Marcar s e inserir s na fila Q
        markupVector[s - 1] = 1; // Subtraimos 1 porque o índice do vetor começa em zero
        q.push(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift();
            
            // Para percorrer os vizinhos, fazemos assim? Poderia ter um uma estrutura (vetor) com cada vizinho do vértice (pegar o grau como comprimento desse vetor)
            // Está percorrendo a linha inteira da matriz
            for (let w = 0 ; w < this.n ; w++){
                if (this.matrix[v - 1][w] === 1) {
                    if (markupVector[w] !== 0) { // Se w não estiver marcado
                        markupVector[w] = 1;
                        q.push(w);
                    }
                }
            }
        }

        return q;
    }
}


module.exports = AdjacencyMatrix; // Export class