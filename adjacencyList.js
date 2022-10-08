const Graph = require('./graph');

class AdjacencyList extends Graph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    } 

    bfs(s,markupStruct) {
        //BFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. 
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer,component] = super.bfs(s,markupStruct);
        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q

            // Para percorrer os vizinhos, basta percorrer a lista de adjacência de cada vertice v
            let w = this.struct[v].head;
            while(w != null){   
                // Preciso verificr se esse vizinho não foi marcado (Lembrando que na lista de adjacência implementada o nó 1 é guardado como 1, e não como 0)
                if (markupVector[w.data - 1] === Infinity) { // Se w não estiver marcado
                    markupVector[w.data - 1] = markupVector[v] + 1; // O nó "w" que é filho do nó "v", terá 1 nível a mais que "v"
                    q.push(w.data - 1);
		            // Adiciono w nessa componente e retiro w da lista de desconhecidos.
		            component.push(w.data)
		            markupStruct[w.data - 1].delete()

                    // Acompanho a maior camada enquanto busco
                    if (maxLayer < markupVector[w.data - 1]) maxLayer = markupVector[w.data - 1];
                    
                    // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                    this.writeOutput([`Nível ${markupVector[w.data - 1]}: `, `Vértice ${w.data} (pai: ${v + 1})`]) 

                    }
                w = w.next;
            }
        }

        return [markupVector, maxLayer,component];
    }

    dfs(s){

        //DFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. ()
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer] = super.dfs(s); 

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift();

            // Para percorrer os vizinhos, basta percorrer a lista de adjacência de cada vertice v
            let w = this.struct[v].head;
            while(w != null){   
                // Preciso verificar se esse vizinho não foi marcado (Lembrando que na lista de adjacência implementada o nó 1 é guardado como 1, e não como 0. )
                if (markupVector[w.data - 1] === -1) { // Se w não estiver marcado
                    markupVector[w.data - 1] = markupVector[v] + 1;
                    q.push(w.data - 1);
                    // Acompanho a maior camada enquanto busco
                    if (maxLayer < markupVector[w.data - 1]) maxLayer = markupVector[w.data - 1];

                    // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                    this.writeOutput([`Nível ${markupVector[w.data - 1]}: `, `Vértice ${w.data} (pai: ${v + 1})`]) 
                    }
                w = w.next;
            }
        }

        return [markupVector, maxLayer];
    }
    
}

module.exports = AdjacencyList; // Export class
