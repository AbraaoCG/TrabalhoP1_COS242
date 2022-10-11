const AdjacencyMatrix = require('./adjacencyMatrix');
const AdjacencyList = require('./adjacencyList');
const AdjacencyVector = require('./adjacencyVector');
const input = 'grafo_3.txt'

myGraph = new AdjacencyVector(input);

const start = Date.now()

for (let k = 1; k <= 1000; k++) {
    myGraph.bfs(k)         
}

const executionTime = (Date.now() - start) / 1000


console.log(executionTime)

//sleep(5000)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
