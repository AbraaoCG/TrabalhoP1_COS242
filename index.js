const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'grafo2_w.txt';

myGraph = new WeightAdjacencyList(input);
//myGraph.dijkstraHeap(1);

let n = myGraph.n
let s = 0;

time_i = Date.now()
for(x = 0; x < 100 ; x++) {
    s = Math.floor( Math.random() * n ) + 1 // Math random  = [0,1[
    
    //console.log(s)
    myGraph.dijkstraHeap(s);
    //myGraph.dijkstraVector(s);
}

tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / 100
console.log(" tempo medio de execucao : ", tMedio , " s")

/*
time_i = Date.now()
distancias_sv = myGraph.distAndMinimalPathVector(10);
tTotal = Date.now() - time_i

for (v = 2; v <=6 ; v ++){
    console.log(distancias_sv[(v * 10) - 1] ) 
}
console.log(" tempo de execucao : ", (tTotal / 1000 ) , " s")
*/