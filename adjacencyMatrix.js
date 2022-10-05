const Graph = require('./graph');

class AdjacencyMatrix extends Graph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    } 

    bfs(s) {
        let [q, markupVector] = super.bfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q
            
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

        return markupVector;
    }
}

module.exports = AdjacencyMatrix; // Export class
