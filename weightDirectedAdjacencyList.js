const WeightGraph = require('./weightGraph');
const LinkedList = require('./linkedList.js');

class WeightDirectedAdjacencyList extends WeightGraph { // Classe base para grafos direcionados com peso armazenados em lista de adjacência
    constructor(inputPath) {
        super(inputPath);
    }; 

    buildInitialStruct(n) {
        // Vértices associados a um vetor de dimensão n (número de vértices no grafo)
        let struct = new Array(n);
        for (let i = 0 ; i < n ; i++) {
            struct[i] = new LinkedList(); // Cada vértice possui uma lista de vértices adjacentes
        };
        // Retorna a estrutura inicial e o método de preenchimento da representação
        return [this.fillStruct, struct];
    };
    
    fillStruct(v1, v2, capacity, struct) {
        // Cada elemento da lista de vértices adjacentes será um array onde o primeiro elemento será o 
        // vértice vizinho, o segundo será a capacidade da aresta
        // Como o grafo é direcionado, apenas v2 é adicionado a lista de vértices adjacentes de v1
        struct[v1 - 1].append([v2 - 1, capacity]); // Adiciona v2 e a capacidade da aresta à lista de Adj de v1

        return struct;
    };

    createResidualGraph() {
        // Cria estrutura inicial do grafo residual com lista de adjacência
        let residualStruct = this.buildInitialStruct(this.n)[1]; 

        // Percorre o grafo original para criação do grafo residual
        for (let i = 0; i < this.n ; i++) { // Percorre os vértices do grafo original
            let v1 = i;
            let v2 = this.struct[v1].head;
            
            while (v2 !== null) { // Percorre a lista de vizinhos de cada vértice para criação das arestas do grafo residual 
                // Cada aresta do grafo residual armazenará um array onde o terceiro elemento indica se é original (true) ou se é reversa (false)
                // Adiciona as arestas residuais, onde a capacidade residual (capacidade original - fluxo), inicialmente, será a capacidade original e o fluxo será zero
                // Por fim, o quarto elemento será um ponteiro da aresta original para a aresta reversa e da aresta reversa para a original (isso é feito para otimizar a atualização do grafo residual)
                let originalEdge = residualStruct[v1].append([v2.data[0], v2.data[1], true]); // Adiciona a aresta original ao grafo residual que armazenará a capacidade residual 
                let reverseEdge = residualStruct[v2.data[0]].append([v1, 0, false, originalEdge]); // Adiciona a aresta original ao grafo residual que armazenará o fluxo
                originalEdge.data.push(reverseEdge); // Adiciona ponteiro da aresta reversa 
                
                v2 = v2.next;
            };
        };

        return residualStruct;
    };

    bfsGetPath(s , t, residualGraph) {
        let markupFlowVector = new Array(this.n);  // Desmarcar todos os vértices no vetor de marcações
        let parent = new Array(this.n); // Vetor armazena o nó representante da aresta que liga o pai ao filho e a chave do pai
        for (let i = 0 ; i < this.n ; i++) {
            markupFlowVector[i] = false;
            parent[i] = undefined; // Vetor será inicializado como "undefined"
        };
        // Definir fila Q vazia
        let q = [];

        // O vetor "markupFlowVector" irá servir tanto como vetor de marcação da bfs, quanto parar armazenar o fluxo máximo até
        // um vértice descoberto. Quando "t" for encontrado, teremos a informação do gargalo "b" do caminho
        markupFlowVector[s - 1] = Infinity; // Inicializar o pathFlow até "s" como infinito
        q.push(s - 1); // Inserir s na fila Q

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar vértice "v" de Q
            
            // Para percorrer os vizinhos, basta percorrer a lista de adjacência de cada vértice "v"
            let w = residualGraph[v].head;
            while(w != null){  
                // Preciso verificar se esse vizinho não foi marcado, ou seja, se w.data[0] === false, podemos adicionar "w" ao caminho da bfs
                // Para o algóritimo de Ford Fulkerson, também preciso realizar as seguintes verificações nas arestas residuais:
                //  a) Para a aresta original: Se a capacidade residual é zero, não podemos mais passar fluxo pela aresta
                //  b) Para a aresta reversa: Se o fluxo é zero, não podemos remover fluxo da aresta
                // Assim, se w.data[1] > 0, podemos adicionar "w" ao caminho da bfs
                if (markupFlowVector[w.data[0]] === false && w.data[1] > 0) { // Se w não estiver marcado e weight(e) > 0
                    markupFlowVector[w.data[0]] = Math.min(markupFlowVector[v], w.data[1]); // Cálculo de gargalo ao longo da BFS
                    parent[w.data[0]] = [v, w]; // Armazeno o pai do vértice "w" ("v") e o nó representante da aresta que liga o "v" à "w" (otimizará a atualização do grafo residual)
                    q.push(w.data[0]); // Adiciono vértice "w" ao conjunto dos descobertos
                    
                    if ((w.data[0] + 1) === t){ // Se encontro caminho aumentante s -> t, então a BFS pode parar, retornando o vetor de pais (caminho) e o gargalo do caminho
                        return [parent, markupFlowVector[t - 1]];
                    };
                };
                
                w = w.next;
            };
        };
    };

    getOutput(residualGraph, writeOutput) {
        let flowArray = [];
        let v;

        if (writeOutput === true) {
            this.writeOutput(`Vertice1\tVertice2\tFluxo`);
        };

        for (v = 0; v < this.n; v++) {
            if (residualGraph[v].head != null) { // Se o vértice tem algum vizinho, então percorro esses vizinhos
                let info;
                let w = residualGraph[v].head;
                while(w !== null) {
                    // Considera apenas arestas reversas do grafo residual porque elas que representam o fluxo
                    if (w.data[2] === false) { 
                        info = [w.data[0] + 1, v + 1, w.data[1]];

                        flowArray.push(info);
                        if (writeOutput === true) {
                            this.writeOutput(`${info[0]}\t${info[1]}\t${info[2]}`);
                        };
                    }
                    
                    w = w.next;
                };
            };
        };
        
        return flowArray;
    };

    fordFulkerson(s, t, writeOutput) {
        let residualGraph = this.createResidualGraph(); // Cria grafo residual
        let maxFlow = 0; // Fluxo máximo
        let augmentingPath = true; // Flag para existência de caminho aumentante
        let v; // Vértice "v" servirá para percorrer caminho aumentante

        while (augmentingPath === true) {
            let result = this.bfsGetPath(s , t, residualGraph); // Obtenho arestas e gargalo de um caminho aumentante com BFS   
            
            // Se a BFS retornou undefined, então não há mais caminho aumentante, isto é, não será mais possível aumentar o fluxo da rede
            // Assim, paro o loop principal
            let parent;
            let pathFlow;
            if (result === undefined) { 
                augmentingPath = false;
                continue; 
            } else { 
                [parent, pathFlow] = result; // Se encontrou caminho, armazena o vetor de pais (caminho) e o gargalo do caminho
            };
            
            // Percorro arestas do caminho aumentante, realizando as seguintes operações:
            //  a) Para a aresta original: f(e) + gargalo
            //  b) Para a aresta reversa: f(e) - gargalo
            // Lembrando que o terceiro elemento da aresta no grafo residual indica se a aresta é original ou reversa
            // Lembrando também que ao atualizar a aresta original, preciso atualizar a reversa e vice-versa, isso será possível
            // através do quarto elemento do nó que é o ponteiro para a aresta original/reversa
            for (v = t - 1; v != s - 1; v = parent[v][0]) {
		// A operação condicional a seguir não é essencial, pois as duas operações com a aresta do caminho e sua complementar
		// (complementar da original é reversa e vice-versa) são idênticas. No entanto, realizamos mesmo assim para deixar
		// claro o que está sendo feito em cada um dos casos:
                if (parent[v][1].data[2]) { // Se w[2] vale "true", é aresta original
                    parent[v][1].data[1] -= pathFlow; // Acesso aresta dentro do grafo residual e diminuo capacida residual com o gargalo
                    parent[v][1].data[3].data[1] += pathFlow; // Acesso aresta dentro do grafo residual através do ponteiro e aumento o fluxo com o gargalo
                } else { // Se w[2] vale "false", é aresta reversa
                    parent[v][1].data[1] -= pathFlow; // Acesso aresta dentro do grafo residual e diminuo o fluxo com o gargalo
                    parent[v][1].data[3].data[1] += pathFlow; // Acesso aresta dentro do grafo residual através do ponteiro e aumento a capacidade residual com o gargalo
                };
            };

            maxFlow += pathFlow;
        };

        // O trabalho de disciplina requer que o algoritmo retorne o fluxo máximo e a alocação de fluxo, além de imprimir essa alocação
        if (writeOutput == true) {
            this.writeOutput(`--- Output Ford-Fulkerson ---\nFluxo máximo = ${maxFlow}\n Array no formato`)
        };

        // Função retorna Array com 2 items: Fluxo máximo e Array com informação "v1 - v2 - fluxo"
        return [maxFlow, this.getOutput(residualGraph, writeOutput)];
    };

    findDelta(s) {
        // Encontra maior potência de 2, que não seja maior do que "C" (capacidade de saída de s)
        let outputCapacity = 0;
        let w = this.struct[s - 1].head;
        // Soma as capacidades das arestas de saída de s
        while(w != null) {
            outputCapacity += w.data[1];
            w = w.next;
        };

        // Variável "n" armazena a potência de 2
        let n = 0;
        while(2**n <= outputCapacity) {
            n++;
        };
        return 2**(n - 1);
    };

    bfsGetPathWithDelta(s , t, residualGraph, delta) {
        let markupFlowVector = new Array(this.n);  // Desmarcar todos os vértices no vetor de marcações
        let parent = new Array(this.n); // Vetor armazena o nó representante da aresta que liga o pai ao filho e a chave do pai
        for (let i = 0 ; i < this.n ; i++) {
            markupFlowVector[i] = false;
            parent[i] = undefined; // Vetor será inicializado como "undefined"
        };
        // Definir fila Q vazia
        let q = [];

        // O vetor "markupFlowVector" irá servir tanto como vetor de marcação da bfs, quanto parar armazenar o fluxo máximo até
        // um vértice descoberto. Quando "t" for encontrado, teremos a informação do gargalo "b" do caminho
        markupFlowVector[s - 1] = Infinity; // Inicializar o pathFlow até "s" como infinito
        q.push(s - 1); // Inserir s na fila Q

        while (q.length !== 0) { // Enquanto Q não estiver vazia
            let v = q.shift(); // Retirar vértice "v" de Q
            
            // Para percorrer os vizinhos, basta percorrer a lista de adjacência de cada vértice "v"
            let w = residualGraph[v].head;
            while(w != null){  
                // Preciso verificar se esse vizinho não foi marcado, ou seja, se w.data[0] === false, podemos adicionar "w" ao caminho da bfs
                // Para o algóritimo de Ford Fulkerson com delta, também preciso realizar as seguintes verificações nas arestas residuais:
                //  a) Para a aresta original: Se a capacidade residual é menor do que delta, ainda não podemos passar fluxo pela aresta
                //  b) Para a aresta reversa: Se o fluxo é menor do que delta, ainda não podemos remover fluxo da aresta
                // Assim, se w.data[1] >= delta, podemos adicionar "w" ao caminho da bfs
                if (markupFlowVector[w.data[0]] === false && w.data[1] >= delta) { // Se w não estiver marcado e weight(e) >= delta
                    markupFlowVector[w.data[0]] = Math.min(markupFlowVector[v], w.data[1]); // Cálculo de gargalo ao longo da BFS
                    parent[w.data[0]] = [v, w]; // Armazeno o pai do vértice "w" ("v") e o nó representante da aresta que liga o "v" à "w" (otimizará a atualização do grafo residual)
                    q.push(w.data[0]); // Adiciono vértice "w" ao conjunto dos descobertos
                    
                    if ((w.data[0] + 1) === t){ // Se encontro caminho aumentante s -> t, então a BFS pode parar, retornando o vetor de pais (caminho) e o gargalo do caminho
                        return [parent, markupFlowVector[t - 1]];
                    };
                };
                
                w = w.next;
            };
        };
    };

    fordFulkersonWithDelta(s, t, writeOutput) {
        let residualGraph = this.createResidualGraph(); // Cria grafo residual
        let maxFlow = 0; // Fluxo máximo
        let augmentingPath = true; // Flag para existência de caminho aumentante
        let v; // Vértice "v" servirá para percorrer caminho aumentante
        let delta = this.findDelta(s); // Encontra maior potência de 2, que não seja maior do que "C" (capacidade de saída de s)

        while (augmentingPath === true) {
            let result = this.bfsGetPathWithDelta(s , t, residualGraph, delta); // Obtenho arestas e gargalo de um caminho aumentante com BFS   
            
            // Se a BFS retornou undefined, então não há mais caminho aumentante, isto é, não será mais possível aumentar o fluxo da rede
            let parent;
            let pathFlow;
            if (result === undefined) { 
                // Se delta = 1 e não foi achado caminho aumentante, o algoritmo pode parar (arestas com capacidade residual 0 estão saturadas e já não eram consideradas)
                if (delta === 1) {
                    augmentingPath = false;
                } else {
                    delta = delta / 2;
                };
                continue;
            } else { 
                [parent, pathFlow] = result; // Se encontrou caminho, armazena o vetor de pais (caminho) e o gargalo do caminho
            };
            
            // Percorro arestas do caminho aumentante, realizando as seguintes operações:
            //  a) Para a aresta original: f(e) + gargalo
            //  b) Para a aresta reversa: f(e) - gargalo
            // Lembrando que o terceiro elemento da aresta no grafo residual indica se a aresta é original ou reversa
            // Lembrando também que ao atualizar a aresta original, preciso atualizar a reversa e vice-versa, isso será possível
            // através do quarto elemento do nó que é o ponteiro para a aresta original/reversa
            for (v = t - 1; v != s - 1; v = parent[v][0]) {
                if (parent[v][1].data[2]) { // Se w[2] vale "true", é aresta original
                    parent[v][1].data[1] -= pathFlow; // Acesso aresta dentro do grafo residual e aumento o fluxo com o gargalo
                    parent[v][1].data[3].data[1] += pathFlow; // Acesso aresta dentro do grafo residual através do ponteiro e aumento o fluxo com o gargalo
                } else { // Se w[2] vale "false", é aresta reversa
                    parent[v][1].data[1] -= pathFlow; // Acesso aresta dentro do grafo residual e diminuo o fluxo com o gargalo
                    parent[v][1].data[3].data[1] += pathFlow; // Acesso aresta dentro do grafo residual através do ponteiro e diminuo o fluxo com o gargalo
                };
            };

            maxFlow += pathFlow;
        };

        // O trabalho de disciplina requer que o algoritmo retorne o fluxo máximo e a alocação de fluxo, além de imprimir essa alocação
        if (writeOutput == true) {
            this.writeOutput(`--- Output Ford-Fulkerson ---\nFluxo máximo = ${maxFlow}\n`)
        };

        // Função retorna Array com 2 items: Fluxo máximo e Array com informação "v1 - v2 - fluxo"
        return [maxFlow, this.getOutput(residualGraph, writeOutput)];
    };

};

module.exports = WeightDirectedAdjacencyList; // Export class
