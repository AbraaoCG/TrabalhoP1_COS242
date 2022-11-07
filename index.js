const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'input.txt'

myGraph = new WeightAdjacencyList(input);
myGraph.distAndMinimalPath(1)
