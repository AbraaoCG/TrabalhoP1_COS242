const AdjacencyMatrix = require('./adjacencyMatrix');
const AdjacencyList = require('./adjacencyList');
const AdjacencyVector = require('./adjacencyVector');
const input = 'input.txt'

myGraph = new AdjacencyList(input);
console.log(myGraph.getGraphInfo());
console.log(myGraph.dfs(2));






