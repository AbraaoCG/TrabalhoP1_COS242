const Graph = require('./graph');

class AdjacencyVector extends Graph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    } 

    bfs(s) {
        //BFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. 
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer,component] = super.bfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q

            // Para percorrer os vizinhos, basta percorrer o vetor de adjacência de cada vertice v
            for (let i = 0; i < this.struct[v].length; i++){
                let w = this.struct[v][i]
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que no vetor de adjacência implementado o nó 1 é guardado como 1, e não como 0)
                if (markupVector[w - 1] === Infinity) { // Se w não estiver marcado
                    markupVector[w - 1] = markupVector[v] + 1; // O nó "w" que é filho do nó "v", terá 1 nível a mais que "v"
                    q.push(w - 1);
		    //Adiciono w na componente
		    component.append(w)
                    // Acompanho a maior camada enquanto busco
                    if (maxLayer < markupVector[w - 1]) maxLayer = markupVector[w - 1];

                    // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                    this.writeOutput([`Nível ${markupVector[w - 1]}: `, `Vértice ${w} (pai: ${v + 1})`]) 
                }
            }     
        }
            
        return [markupVector, maxLayer,component];
    }

    dfs(s){
        //DFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. 
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer] = super.dfs(s);

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
                    // Acompanho a maior camada enquanto busco
                    if (maxLayer < markupVector[w - 1]) maxLayer = markupVector[w - 1];

                    // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                    this.writeOutput([`Nível ${markupVector[w - 1]}: `, `Vértice ${w} (pai: ${v + 1})`]) 
                }
            }     
        }

        return [markupVector, maxLayer];
    }
}

module.exports = AdjacencyVector; // Export class
