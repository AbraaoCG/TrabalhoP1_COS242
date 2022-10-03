const AdjacencyMatrix = require('./adjacencyMatrix');
const AdjacencyList = require('./adjacencyList');
const AdjacencyVector = require('./adjacencyVector');



class Graph { // Classe Base para Grafos
    constructor(inputPath, graphType) {
        this.representation = this.buildGraph(graphType, inputPath);
    } 

    buildGraph(graphType, inputPath) {
        switch(graphType) {
            case 0:
                return new AdjacencyMatrix(inputPath, graphType);
            case 1: 
                return new AdjacencyList(inputPath, graphType);
            case 2:
                return new AdjacencyVector(inputPath, graphType);
        }
    }
}

myGraph = new Graph("input.txt", 2);
console.log(myGraph.representation.struct);
myGraph2 = new Graph("input.txt", 0);
console.log(myGraph2.representation.bfs(1));




