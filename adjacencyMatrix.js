const GraphStruct = require('./graphStruct');

class AdjacencyMatrix extends GraphStruct { // Classe Base para Grafos
    constructor(inputPath, graphType) {
        super(inputPath, graphType);
    } 

    bfs(s) {
        this.writeOutput(['--- Ouput BFS ---'])
        // Desmarcar todos os vértices com o valor de -1. Isso porque o markupVector receberá o nível de cada vértice
        let markupVector = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            markupVector[i] = -1;
        }

        // Definir fila Q vazia
        let q = [];
        // Marcar s e inserir s na fila Q
        markupVector[s - 1] = 0; // Subtraimos 1 porque o índice do vetor começa em zero
        q.push(s - 1); // Subtraimos 1 porque o índice dos vértices na matriz começa em zero

        this.writeOutput([`Nível ${markupVector[s - 1]}: `, `Vértice ${s} (raíz)`]) // Imprime o nó raíz
        
        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q
            
            // Para percorrer os vizinhos, fazemos assim? Poderia ter um uma estrutura (vetor) com cada vizinho do vértice (pegar o grau como comprimento desse vetor)
            // Está percorrendo a linha inteira da matriz
            for (let w = 0 ; w < this.n ; w++){
                if (this.struct[v][w] === 1) {
                    if (markupVector[w] === -1) { // Se w não estiver marcado
                        markupVector[w] = markupVector[v] + 1; // O nó "w" que é filho do nó "v", terá 1 nível a mais que "v"
                        q.push(w);

                        // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                        // Adicionamos 1 aos vértices porque o índice dos vértices na matriz começa em zero
                        this.writeOutput([`Nível ${markupVector[w]}: `, `Vértice ${w + 1} (pai: ${v + 1})`]) 
                    }
                } 
            }
        }
    }
    dfs(s){
        let markupVector = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            markupVector[i] = 0;
        }
        // Definir pilha Q vazia
        let q = [];
        markupVector[s - 1] = 1;
        q.push(s - 1);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.pop();
            console.log(v + 1);
            
            // Para percorrer os vizinhos, percorremos todos os elementos da matriz de adjacência, caso o registro seja 0 não é vizinho, caso seja 1, é vizinho.
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
