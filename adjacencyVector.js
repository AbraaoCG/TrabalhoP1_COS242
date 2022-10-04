const GraphStruct = require('./graphStruct');
const LinkedList = require('./linkedList.js')

class AdjacencyVector extends GraphStruct { // Classe Base para Grafos
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

            // Para percorrer os vizinhos, basta percorrer o vetor de adjacência de cada vertice v
            
            for(let i = 0; i < this.struct[v].length; i++){
                let w = this.struct[v][i]
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que no vetor de adjacência implementado o nó 1 é guardado como 1, e não como 0. )
                if (markupVector[w - 1] === 0) { // Se w não estiver marcado
                    markupVector[w - 1] = 1;
                    q.push(w - 1);
                }
            }     
        }
            
        return q;
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
            
            // Para percorrer os vizinhos, basta percorrer o vetor de adjacência de cada vertice v
            for(let i = 0; i < this.struct[v].length; i++){
                let w = this.struct[v][i]
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que no vetor de adjacência implementado o nó 1 é guardado como 1, e não como 0. )
                if (markupVector[w - 1] === 0) { // Se w não estiver marcado
                    markupVector[w - 1] = 1;
                    q.push(w - 1);
                }
            }
        }        
    
    return q;
    }
}


module.exports = AdjacencyVector; // Export class
