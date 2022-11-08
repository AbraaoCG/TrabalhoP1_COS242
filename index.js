const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'input.txt';

myGraph = new WeightAdjacencyList(input);
myGraph.dijkstra_Heap(1);
//myGraph.distAndMinimalPath(1);





