const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'grafo1_w.txt';

myGraph = new WeightAdjacencyList(input);
//myGraph.dijkstra_Heap(1);

time_i = Date.now()
distancias_sv = myGraph.distAndMinimalPath(10);
tTotal = Date.now() - time_i

for (v = 2; v <=6 ; v ++){
    console.log(distancias_sv[(v * 10) - 1] ) 
}
console.log(" tempo de execucao : ", (tTotal / 1000 ) , " s")

