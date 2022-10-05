const Graph = require('./graph');

class AdjacencyMatrix extends Graph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    } 

    bfs(s) {
        //BFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. 
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer] = super.bfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar v de Q
            
            // Está percorrendo a linha inteira da matriz
            for (let w = 0 ; w < this.n ; w++){
                if (this.struct[v][w] === 1) {
                    if (markupVector[w] === -1) { // Se w não estiver marcado
                        markupVector[w] = markupVector[v] + 1; // O nó "w" que é filho do nó "v", terá 1 nível a mais que "v"
                        q.push(w);
                        // Acompanho a maior camada enquanto busco
                        if (maxLayer < markupVector[w]) maxLayer = markupVector[w];

                        // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                        // Adicionamos 1 aos vértices porque o índice dos vértices na matriz começa em zero
                        this.writeOutput([`Nível ${markupVector[w]}: `, `Vértice ${w + 1} (pai: ${v + 1})`]) 
                    }
                } 
            }
        }

        return [markupVector,maxLayer];
    }

    dfs(s) {
        //DFS herdada de graph.js tem comandos que servem para todas as estrutura de dados. 
        //'q' é a pilha/fila de nós descobertos não explorados. MakupVector acompanha se o o vertice já foi explorado(!= -1) e guarda a camada do vertice durante a exploração.
        let [q, markupVector,maxLayer] = super.dfs(s);

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.pop();
            
            // Para percorrer os vizinhos, percorremos todos os elementos da matriz de adjacência, caso o registro seja 0 não é vizinho, caso seja 1, é vizinho.
            // Está percorrendo a linha inteira da matriz
            for (let w = 0 ; w < this.n ; w++){
                if (this.struct[v][w] === 1) {
                    if (markupVector[w] === -1) { // Se w não estiver marcado
                        markupVector[w] = markupVector[v] + 1;
                        q.push(w);
                        // Acompanho a maior camada enquanto busco
                        if (maxLayer < markupVector[w]) maxLayer = markupVector[w];
                        
                        // Imprime o nó e o pai do nó descoberto (será aquele que o encontrou, isto é, o vértice "v")
                        this.writeOutput([`Nível ${markupVector[w]}: `, `Vértice ${w + 1} (pai: ${v + 1})`]) 

                    }
                }
            }
        }

        return [markupVector,maxLayer];
    }
}

module.exports = AdjacencyMatrix; // Export class
