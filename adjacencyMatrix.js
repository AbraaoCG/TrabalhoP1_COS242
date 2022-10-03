const GraphStruct = require('./graphStruct');

class AdjacencyMatrix extends GraphStruct { // Classe Base para Grafos
    constructor(inputPath, graphType) {
        super(inputPath, graphType);
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
        q.push(s - 1); // Subtraimos 1 porque o índice dos vértices na matriz começa em zero

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift();
            console.log(v);
            
            // Para percorrer os vizinhos, fazemos assim? Poderia ter um uma estrutura (vetor) com cada vizinho do vértice (pegar o grau como comprimento desse vetor)
            // Está percorrendo a linha inteira da matriz
            for (let w = 0 ; w < this.n ; w++){
                if (this.struct[v][w] === 1) {
                    if (markupVector[w] === 0) { // Se w não estiver marcado
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
