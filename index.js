const weightDirectedAdjacencyList = require('./weightDirectedAdjacencyList');
const input = 'grafo_rf_5.txt'; // endereco do grafo a ser analisado

myGraph = new weightDirectedAdjacencyList(input);

writeOutput = false;
let [s,t] = [1, 2];
num = 1;
time_i = Date.now()
for(x = 0; x < num ; x++) {
    console.log("fluxo:", myGraph.fordFulkersonWithDelta(s, t, writeOutput)[0])
}

tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / num
console.log(" tempo medio de execucao de ", num ," Ford Fulkerson's : ", tMedio , " s")
