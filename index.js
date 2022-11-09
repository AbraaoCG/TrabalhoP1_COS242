const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'input.txt'; // endereco do grafo a ser analisado

myGraph = new WeightAdjacencyList(input);



// Teste Mst
myGraph.mst(1);



// Teste de tempo médio para calcular distâncias comecando de ˋnumˋ  vertices aleatórios.
 
let n = myGraph.n
let s = 0;
num = 20
time_i = Date.now()
for(x = 0; x < num ; x++) {
    s = Math.floor( Math.random() * n ) + 1 // Math random  = [0,1[
    
    //console.log(s)
    myGraph.dijkstraHeap(s);
    //myGraph.dijkstraVector(s);
}

tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / num
console.log(" tempo medio de execucao de ", num ," Dijkstraˋs : ", tMedio , " s")


