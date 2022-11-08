const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'input.txt';

myGraph = new WeightAdjacencyList(input);
//myGraph.dijkstra(1);
myGraph.distAndMinimalPath(1);





