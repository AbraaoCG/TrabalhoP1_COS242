const weightDirectedAdjacencyList = require('./weightDirectedAdjacencyList');
const input = 'input.txt'; // endereco do grafo a ser analisado


// Todos os testes estão comentados entre /**/. Para realizar um dos testes possiveis, retire dos comentários.


// Teste de tempo médio para calcular Fluxo máximo (FordFulkerson) em uma rede de fluxos.
/**/

myGraph = new weightDirectedAdjacencyList(input);

writeOutput = false; // Flag indicando se é desejável impressão de fluxo máximo e alocação de fluxo nas arestas.

let [s,t] = [1, 2]; // Define origem e sumidouro do fluxo.
num = 1;
time_i = Date.now()
for(x = 0; x < num ; x++) {
    console.log("fluxo:", myGraph.fordFulkersonWithDelta(s, t, writeOutput)[0]) // Posição 0 tem fluxo máximo, posição 1 tem alocação.
}

tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / num
console.log(" tempo médio de execução de ", num ," Ford Fulkerson's : ", tMedio , " s")





// Teste Mst
/*
myGraph = new WeightAdjacencyList(input);
time_i = Date.now()
//myGraph.mst(1);
myGraph.mstNoOutput(1); // ---> mais rapida, apenas retorna custo total.
tdif = ( Date.now() - time_i ) / 1000
console.log(" tempo medio de execucao para obter mst : ", tdif , " s")
*/



// Teste de tempo médio para calcular distâncias comecando de ˋnumˋ  vertices aleatórios (usando Dijskstra).
/*
myGraph = new WeightAdjacencyList(input);
let n = myGraph.n
let s = 0;
num = 1
time_i = Date.now()
for(x = 0; x < num ; x++) {
    s = Math.floor( Math.random() * n ) + 1 // Math random  = [0,1[
    s = 1
    //console.log(s)
    myGraph.dijkstraHeap(s);
    //myGraph.dijkstraVector(s);
}
tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / num
console.log(" tempo medio de execucao de ", num ," Dijkstraˋs : ", tMedio , " s")
*/


// Teste de distância s à v, escolhidos pelo usuário.
/*
myGraph = new WeightAdjacencyList(input);
s = 3
v = 1
dist_sv = myGraph.dijkstraHeap(s)[0]
//dist_sv = myGraph.distAndMinimalPathHeap(s) // Tempo de execução para escrever em output.txt as distâncias e caminhos mínimos consideravelmente maior.
console.log(dist_sv[v - 1])
*/