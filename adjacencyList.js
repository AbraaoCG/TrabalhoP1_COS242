const GraphStruct = require('./graphStruct');

class AdjacencyList extends GraphStruct { // Classe Base para Grafos
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

            // Para percorrer os vizinhos, basta percorrer a lista de adjacência de cada vertice v
            let w = this.struct[v].head
            while(w != null){
                
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que na lista de adjacência implementada o nó 1 é guardado como 1, e não como 0. )
                if (markupVector[w.data - 1] === 0) { // Se w não estiver marcado
                    markupVector[w.data - 1] = 1;
                    q.push(w.data - 1);
                    }
                w = w.next
                }
            }
        return q;
    }
    
}


module.exports = AdjacencyList; // Export class
