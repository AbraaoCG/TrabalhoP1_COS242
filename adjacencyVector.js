const Graph = require('./graph');

class AdjacencyVector extends Graph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    } 

    bfs(s) {
        let [q, markupVector] = super.bfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q

            // Para percorrer os vizinhos, basta percorrer o vetor de adjacência de cada vertice v
            for (let i = 0; i < this.struct[v].length; i++){
                let w = this.struct[v][i]
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que no vetor de adjacência implementado o nó 1 é guardado como 1, e não como 0)
                if (markupVector[w - 1] === -1) { // Se w não estiver marcado
                    markupVector[w - 1] = markupVector[v] + 1; // O nó "w" que é filho do nó "v", terá 1 nível a mais que "v"
                    q.push(w - 1);

                    // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                    this.writeOutput([`Nível ${markupVector[w - 1]}: `, `Vértice ${w} (pai: ${v + 1})`]) 
                }
            }     
        }
            
        return markupVector;
    }

    dfs(s){
        let [q, markupVector] = super.dfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift();
            console.log(v);

            // Para percorrer os vizinhos, basta percorrer o vetor de adjacência de cada vertice v
            
            for(let i = 0; i < this.struct[v].length; i++){
                let w = this.struct[v][i]
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que no vetor de adjacência implementado o nó 1 é guardado como 1, e não como 0. )
                if (markupVector[w - 1] === -1) { // Se w não estiver marcado
                    markupVector[w - 1] = markupVector[v] + 1;
                    q.push(w - 1);
                    this.writeOutput([`Nível ${markupVector[w - 1]}: `, `Vértice ${w} (pai: ${v + 1})`]) 
                }
            }     
        }

        return markupVector;
    }
}

module.exports = AdjacencyVector; // Export class
