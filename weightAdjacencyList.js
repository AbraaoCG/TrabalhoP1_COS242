const Heap = require('./heap');
const WeightGraph = require('./weightGraph');
const LinkedList = require('./linkedList');

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

    getMin(exploitedArray, baseArray) {
        let min = Infinity;
        let minIndex;
        for (let i = 0 ; i < this.n ; i++) {
            if (exploitedArray[i] === false && baseArray[i] < min) {
                minIndex = i;
                min = baseArray[minIndex];
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

    prim(s) {
        let cost = new Array(this.n);
        let parent = new Array(this.n);
        let exploitedArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            cost[i] = Infinity;
            parent[i] = undefined;
            exploitedArray[i] = false;
        };

        cost[s - 1] = 0;
        let u;
        for (let i = 0 ; i < this.n ; i++) {
            u = this.getMin(exploitedArray, cost);
            exploitedArray[u] = true;

            let v = this.struct[u].head;
            let vIndex;
            let edgeWeight;
            while(v != null){
                vIndex = v.data[0];
                edgeWeight = v.data[1];   
                if (cost[vIndex] > edgeWeight && exploitedArray[vIndex] == false) {
                    cost[vIndex] = edgeWeight;
                    parent[vIndex] = u;
                };

                v = v.next;
            };
        };

        return [cost, parent];
    };

    mst() {
        this.writeOutput(['--- Ouput MST ---']);
        const [cost, parent] = this.prim(1);
        let total = 0;
        for (let i = 1 ; i < cost.length ; i++) {
            total += cost[i];
            this.writeOutput([`${parent[i] + 1} ${i + 1}`]);
        };
        this.writeOutput([`Custo total: ${total}`]);
    }

    dijkstraHeap(s) {
        if (this.negativeWeights) {
            throw 'Library does not yet implement shortest paths with negative weights'
        }

        // Marca a distância de todos os vértices como infinito ( em uma Heap ), os pais de cada vértice como indefinido e cria um vetor de explorados.
        // A heap uma subclasse de um Array do javascript, e o atributo "controlIndex" é um Array que guarda na posição 'v' o index da distância de v na Heap.
        let dist = new Heap(this.n, true);
        let parent = new Array(this.n);
        let exploitedArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            dist[i] = Infinity;
            parent[i] = undefined;
            exploitedArray[i] = false;
        };
        // insere o vertice inicial na raiz da Heap e define no vetor "dist.heapIndex" a posição do vertice inicial 's' na Heap.
        dist[0] = 0;
        dist.heapIndex[s - 1] = 0;
        let u;
        for (let i = 0 ; i < this.n ; i++) { // Itera-se em 'n', pois sabemos que todos os vértices serão selecionados como 'u' para serem explorados.
            u = dist.extractMin(); // Extrai a menor distância na Heap, reordenando a Heap para manter a heap-order e também reordena o array heapIndex
            exploitedArray[u] = true;

            let v = this.struct[u].head;
            let vIndex; // Varíavel que armazena vizinho 'v' de 'u'
            let edgeWeight; // Varíavel que armazena peso da aresta u - v.
            let newPriority; // Varíavel que armazena a possível nova prioridade
            let heapIndexToChange; // Variável que armazena o possível índice que deverá ter sua prioridade alterada
            while(v != null) {
                vIndex = v.data[0]; 
                edgeWeight = v.data[1];
                heapIndexToChange = dist.heapIndex[vIndex]
                if (dist[heapIndexToChange] > (dist[u] + edgeWeight)) {
                    newPriority = dist[u] + edgeWeight;
                    dist.changePriority(heapIndexToChange, newPriority);
                    parent[vIndex] = u;
                };

                v = v.next;
            };
        };

        return [dist, parent];
    };
};

module.exports = WeightAdjacencyList; // Export class