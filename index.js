const AdjacencyMatrix = require('./adjacencyMatrix');
const AdjacencyList = require('./adjacencyList');
const AdjacencyVector = require('./adjacencyVector');
const input = 'grafo_4.txt'


myGraph = new AdjacencyList(input);
console.log(myGraph.convexComponents())







