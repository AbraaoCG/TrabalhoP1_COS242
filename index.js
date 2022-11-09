const WeightAdjacencyList = require('./weightAdjacencyList');
const LinkedList = require('./linkedList');
const input = 'grafo3_w.txt'; // endereco do grafo a ser analisado

myGraph = new WeightAdjacencyList(input);


// Todos os testes estão comentados entre /**/. Para realizar um dos testes requitados, retire dos comentários.


// Teste Mst
/**/
time_i = Date.now()
//myGraph.mst(1);
myGraph.mstNoOutput(1); // ---> mais rapida, apenas retorna custo total.
tdif = ( Date.now() - time_i ) / 1000
console.log(" tempo medio de execucao para obter mst : ", tdif , " s")




// Teste de tempo médio para calcular distâncias comecando de ˋnumˋ  vertices aleatórios.
/*
let n = myGraph.n
let s = 0;
num = 1
time_i = Date.now()
for(x = 0; x < num ; x++) {
    s = Math.floor( Math.random() * n ) + 1 // Math random  = [0,1[
    s = 1
    //console.log(s)
    myGraph.dijkstraHeap(s);
    //myGraph.dijkstraVector(s);
}

tTotal = ( Date.now() - time_i ) / 1000
tMedio = tTotal / num
console.log(" tempo medio de execucao de ", num ," Dijkstraˋs : ", tMedio , " s")
*/


// Teste de distância s à v, escolhidos pelo usuário.
/*
s = 10 
v = 40
dist_sv = myGraph.dijkstraHeap(s)[0]
//dist_sv = myGraph.distAndMinimalPathHeap(s) // Tempo de execução para escrever em output.txt as distâncias e caminhos mínimos consideravelmente maior.
console.log(dist_sv[v - 1])

*/