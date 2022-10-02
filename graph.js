const AdjacencyMatrix = require('./adjacencyMatrix');

class Graph { // Classe Base para Grafos
    constructor(inputPath, graphType) {
        this.struct = this.buildGraph(graphType, inputPath);
    } 

    buildGraph(graphType, inputPath) {
        switch(graphType) {
            case 0:
                return new AdjacencyMatrix(inputPath);
            case 1: 
                return 'Adjacency List';
            case 2:
                return 'Adjacency Vector';
        }
    }
}

myGraph = new Graph("input.txt", 0)
console.log(myGraph)




