const Heap = require('./heap');
const WeightGraph = require('./weightGraph');
const LinkedList = require('./linkedList.js');

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

    getMin(exploitedArray, baseArray) { // Metodo auxiliar para percorrer "descobertos "
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

    dijkstraVector(s) {
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

    dijkstraHeap(s) {
        if (this.negativeWeights) { // Verifico se ha pesos negativos.
            throw 'Library does not yet implement shortest paths with negative weights'
        }

        // Marca a distância de todos os vértices como infinito, os pais de cada vértice como indefinido e a todos os vertices como nao explorados
        let distHeap = new Heap(this.n, true);
        let parent = new Array(this.n);
        let dist = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            parent[i] = undefined;
            dist[i] = Infinity;
            distHeap.insert([Infinity, i])
            distHeap.heapIndex[i] = i;
        };
        
        // Distancia de s --> s  = 0
        distHeap.changePriority(distHeap.heapIndex[s - 1], 0);

        let u; // Vértice de maior prioridade
        let dist_u; // Distância da origem de maior prioridade
        for (let i = 0 ; i < this.n ; i++) { // Itera-se em 'n', pois sabemos que todos os vértices serão selecionados como 'u' para serem explorados.
            [dist_u, u] = distHeap.extractMin(); // Extrai a menor distância na Heap, reordenando a Heap para manter a heap-order e também reordena o array heapIndex
            dist[u] = dist_u;  // Após explorado, a distância de "s" à "u" não será alterada novamente
            
            let v = this.struct[u].head; // Seleciono primeiro vizinho de u
            let vIndex; let edgeWeight; let heapIndexToChange; 

            while(v != null){
                if (dist[v.data[0]] === Infinity){ // Se ainda não foi explorado, descubro vizinho
                    vIndex = v.data[0];
                    edgeWeight = v.data[1];  
                    heapIndexToChange = distHeap.heapIndex[vIndex];
                    //console.log(distHeap[heapIndexToChange][0] , dist_u + edgeWeight)
                    if (distHeap[heapIndexToChange][0] > (dist_u + edgeWeight)) {
                        distHeap.changePriority(heapIndexToChange, dist_u + edgeWeight);
                        parent[vIndex] = u;
                    };    
                }
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

    distAndMinimalPathHeap(s, v = null) {
        let [dist, parent] = this.dijkstraHeap(s);
        let minimalPath;
        for (let i = 0 ; i < dist.length ; i++) {
            minimalPath = this.getMinimalPath(i, parent);
            //console.log(`Distância do vértice ${s} até ${i + 1} é: ${dist[i]}. Um dos caminhos mínimos é dado por ${minimalPath}`);
        };
        if (v != null) return dist[ v - 1 ]
        else{ return dist };
    };

    distAndMinimalPathVector(s, v = null) {
        let [dist, parent] = this.dijkstraVector(s);
        let minimalPath;
        for (let i = 0 ; i < dist.length ; i++) {
            minimalPath = this.getMinimalPath(i, parent);
            //console.log(`Distância do vértice ${s} até ${i + 1} é: ${dist[i]}. Um dos caminhos mínimos é dado por ${minimalPath}`);
        };
        if (v != null) return dist[ v - 1 ]
        else{ return dist };
    };

    prim(s) {
        let costHeap = new Heap(this.n, true);
        let cost = new Array(this.n);
        let parent = new Array(this.n);
        let exploitedArray = new Array(this.n);
        for (let i = 0 ; i < this.n ; i++){
            cost[i] = Infinity
            parent[i] = undefined;
            exploitedArray[i] = false;
            costHeap.insert([Infinity, i])
            costHeap.heapIndex[i] = i;
        };

        costHeap.changePriority(costHeap.heapIndex[s - 1], 0);

        let u;
        let cost_u;
        for (let i = 0 ; i < this.n ; i++) {
            [cost_u, u] = costHeap.extractMin();
            cost[u] = cost_u;
            exploitedArray[u] = true;

            let v = this.struct[u].head;
            let vIndex;
            let edgeWeight;
            let heapIndexToChange;
            while(v != null){
                vIndex = v.data[0];
                // Verificamos se o vértice "v" vizinho de "u" já foi explorado, se ainda não foi, talvez teremos que atualizar seu custo
                if (cost[v.data[0]] === Infinity) { 
                    edgeWeight = v.data[1];  
                    heapIndexToChange = costHeap.heapIndex[vIndex];
                    // Se custo da aresta w(u,v) para adicioná-lo é maior do que o custo de "v" e o vértice "v" ainda não foi explorado, atualizamos seu custo
                    if (costHeap[heapIndexToChange][0] > edgeWeight) {
                        costHeap.changePriority(heapIndexToChange, edgeWeight);
                        parent[vIndex] = u;
                    };    
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
};

module.exports = WeightAdjacencyList; // Export class