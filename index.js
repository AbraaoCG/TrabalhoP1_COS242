const AdjacencyMatrix = require('./adjacencyMatrix');
const AdjacencyList = require('./adjacencyList');
const AdjacencyVector = require('./adjacencyVector');
const input = 'input.txt'

myGraph = new AdjacencyMatrix(input);
console.log(myGraph.getGraphInfo());
console.log(myGraph.bfs(1));






