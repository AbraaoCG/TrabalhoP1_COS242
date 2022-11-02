const WeightGraph = require('./weightGraph');
const LinkedList = require('./linkedList.js')

class WeightAdjacencyList extends WeightGraph { // Classe Base para Grafos
    constructor(inputPath) {
        super(inputPath);
    }; 
    
    fillStruct(v1, v2, weight, struct) {
        // Cada elemento da lista de vértices adjacentes será um array onde o primeiro elemento será o 
        // vértice vizinho e o segundo elemento será o peso da aresta (element: [adj vertex, weight])
        struct[v1 - 1].append([v2 - 1, weight]); // Adiciona v2 e o peso da aresta a lista de Adj de v1
        struct[v2 - 1].append([v1 - 1, weight]); // Adiciona v1 e o peso da aresta a lista de Adj de v2

        return struct;
    };

    buildInitialStruct(n) {
        // Vértices associados a um vetor de dimensão n (número de vértices no grafo)
        let struct = new Array(n);
        for (let i = 0 ; i < n ; i++) {
            struct[i] = new LinkedList(); // Cada vértice possui uma lista de vértices adjacentes
        };
        return [this.fillStruct, struct];
    };

    getMin(exploitedArray, dist) {
        let min = Infinity;
        let minIndex;
        for (let i = 0 ; i < this.n ; i++) {
            if (exploitedArray[i] === false && dist[i] < min) {
                minIndex = i;
                min = dist[minIndex];
            };
        };
        return minIndex;
    };

    dijkstra(s) {
        if (this.negativeWeights) {
            throw 'Library does not yet implement shortest paths with negative weights'
        }

        // Marca a distância de todos os vértices como infinito e os pais de cada vértice como indefinido
        let dist = new Array(this.n);
        let parent = new Array(this.n);
        let exploitedArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            dist[i] = Infinity;
            parent[i] = undefined;
            exploitedArray[i] = false;
        };

        dist[s - 1] = 0;
        let u;
        for (let i = 0 ; i < this.n ; i++) {
            u = this.getMin(exploitedArray, dist);
            exploitedArray[u] = true;

            let v = this.struct[u].head;
            let vIndex;
            let edgeWeight;
            while(v != null){
                vIndex = v.data[0];
                edgeWeight = v.data[1];   
                if (dist[vIndex] > (dist[u] + edgeWeight)) {
                    dist[vIndex] = dist[u] + edgeWeight;
                    parent[vIndex] = u;
                };

                v = v.next;
            };
        };

        return [dist, parent];
    };

    getMinimalPath(s, parent) {
        let minimalPath = [s + 1];
        let v = s;
        while(parent[v] !== undefined) { // Ainda não chegou até a raíz
            minimalPath.unshift(parent[v] + 1);
            v = parent[v];
        };

        return minimalPath;
    };

    distAndMinimalPath(s) {
        let [dist, parent] = this.dijkstra(s);
        let minimalPath;
        for (let i = 0 ; i < dist.length ; i++) {
            minimalPath = this.getMinimalPath(i, parent);
            console.log(`Distância do vértice ${s} até ${i + 1} é: ${dist[i]}. Um dos caminhos mínimos é dado por ${minimalPath}`);
        };
    };
};

module.exports = WeightAdjacencyList; // Export class