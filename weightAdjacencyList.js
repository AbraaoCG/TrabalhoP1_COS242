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
            if (exploitedArray[i] === false && baseArray[i] <= min) {
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

            if (dist[u] === Infinity) { break }; // Quando o mínimo é um vértice com distância infinito quer dizer que a componente conexa acabou (conjunto dos descobertos acabou)

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
        while (distHeap[0] != undefined && distHeap[0][0] !== Infinity) { // No momento um vértice com distância infinita está na raiz, significa que a componente conexa terminou de ser analisada (conjunto descobertos acabou)
            
	    [dist_u, u] = distHeap.extractMin(); // Extrai a menor distância na Heap, reordenando a Heap para manter a heap-order e também reordena o array heapIndex
            dist[u] = dist_u;  // Após explorado, a distância de "s" à "u" não será alterada novamente
            //console.log(u)
            let v = this.struct[u].head; // Seleciono primeiro vizinho de u
            let vIndex; let edgeWeight; let heapIndexToChange; 

            while(v != null){
                if (dist[v.data[0]] === Infinity){ // Se ainda não foi explorado, descubro vizinho
                    vIndex = v.data[0];
                    edgeWeight = v.data[1];  
                    heapIndexToChange = distHeap.heapIndex[vIndex]; // índice na Heap referente ao vértice "v"
                    
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

    getMinimalPath(u, parent) { // Encontra caminho mínimo do vértice "u" até a "s" utilizando o array de parents
        let minimalPath = [u + 1]; // Inicia uma lista de caminho mínimo com o vértice "u"
        let v = u;
        while(parent[v] !== undefined) { // Itera sobre o array de parent até chegar em "undefined", isto é, na raiz
            minimalPath.unshift(parent[v] + 1); // Adiciona o pai de "v" no ínicio da lista de caminho mínimo
            v = parent[v];
        };

        return minimalPath;
    };

    distAndMinimalPathHeap(s) {
        let [dist, parent] = this.dijkstraHeap(s); // Retorna array de distâncias até "s" e o array de pais usando dijkstra com Heap
        let minimalPath;
        for (let i = 0 ; i < dist.length ; i++) { // Itera sobre todos os vértices do grafo imprimindo a distância e o caminho mínimo de "i" até "s"
            minimalPath = this.getMinimalPath(i, parent); // Calcula caminho mínimo de "i" até "s"
            this.writeOutput(`Distância do vértice ${s} até ${i + 1} é: ${dist[i]}. Um dos caminhos mínimos é dado por ${minimalPath}`);
        };
        return dist;
    };

    distAndMinimalPathVector(s) {
        let [dist, parent] = this.dijkstraVector(s); // Retorna array de distâncias até "s" e o array de pais usando dijkstra sem Heap
        let minimalPath;
        for (let i = 0 ; i < dist.length ; i++) { // Itera sobre todos os vértices do grafo imprimindo a distância e o caminho mínimo de "i" até "s"
            minimalPath = this.getMinimalPath(i, parent); // Calcula caminho mínimo de "i" até "s"
            this.writeOutput(`Distância do vértice ${s} até ${i + 1} é: ${dist[i]}. Um dos caminhos mínimos é dado por ${minimalPath}`);
        };
        return dist;
    };

    prim(s) {
        let costHeap = new Heap(this.n, true); // Ordena os custos em uma Heap
        let cost = new Array(this.n); // Armazena o custo de cada vértice
        let parent = new Array(this.n); // Armazena o pai de cada vértice da mst
        for (let i = 0 ; i < this.n ; i++){
            cost[i] = Infinity;
            parent[i] = undefined;
            costHeap.insert([Infinity, i]);
            costHeap.heapIndex[i] = i;
        };

        costHeap.changePriority(costHeap.heapIndex[s - 1], 0); // Adiciona o custo da raiz como zero na Heap

        let u;
        let cost_u;
        while (costHeap[0][0] !== Infinity) {
            [cost_u, u] = costHeap.extractMin(); // Extrai a custo e o vértice raiz da Heap, ou seja, aquela que tem menor custo dentre as descobertas
            cost[u] = cost_u; // Define o custo definitivo do vértice "u" que será explorado

            let v = this.struct[u].head; // Descobre o primeiro vizinho de u
            let vIndex;
            let edgeWeight;
            let heapIndexToChange;
            while(v != null){
                vIndex = v.data[0];
                if (cost[v.data[0]] === Infinity) { // Verificamos se o vértice "v" vizinho de "u" já foi explorado, se já foi, o seu custo não será mais atualizado
                    edgeWeight = v.data[1];  
                    heapIndexToChange = costHeap.heapIndex[vIndex]; // índice na Heap referente ao vértice "v"
                    // Se custo da aresta w(u,v) para adicioná-lo é maior do que o custo de "v", atualizamos seu custo
                    if (costHeap[heapIndexToChange][0] > edgeWeight) { 
                        costHeap.changePriority(heapIndexToChange, edgeWeight); // Atualiza custo de "v" na Heap
                        parent[vIndex] = u; // Atualiza "u" como pai de "v" no array de pais
                    };    
                };
                v = v.next;
            };
        };

        return [cost, parent];
    };

    mst() {
        // Método para imprimir árvore geradora mínima (mst), que deve ser escrita em um arquivo (mesmo formato que um grafo), assim como seu peso total
        this.writeOutput(['--- Ouput MST ---']);
        const [cost, parent] = this.prim(1); // Inicia o algoritmo de prim no vértice 1 (poderia iniciar por qualquer vértice para um grafo conexo)
        let total = 0;
        for (let i = 0 ; i < cost.length ; i++) { // Pula o vértice raiz porque não tem pai 
            if (cost[i] !== Infinity && cost[i] !== 0) { // Não vai imprimir vértices com custo infinito (não estão na mesma componente conexa), nem a raiz (não tem pai)
                total += cost[i]; // Soma o custo total da mst
                this.writeOutput([`${parent[i] + 1} ${i + 1} ${cost[i]}`]); // Imprime aresta da seguinte forma: pai de "i", "i", custo de "i"
            };
        };
        this.writeOutput([`Custo total: ${total}`]);
    };
};

module.exports = WeightAdjacencyList; // Export class