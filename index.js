const Heap = require('heap-js')
const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'input.txt';

myGraph = new WeightAdjacencyList(input);
myGraph.dijkstraHeap(1);





