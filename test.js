// Arquivo de teste para verificar se no Javascript decrescer o tamanho de um Array em 1 
// custa O( 1 ) ou O( n ), utilizando o método length = length - 1

// É preciso realizar essa verificacão, pois na implementacao da Heap utilizamos esse método toda
// vez que é retirado um vértice da Heap

let x;
let list = new Array(1000000)

let list2 = new Array(1)

for (x = 0 ; x < 1000000 ; x++){
    list[x] = x
}

list2[0] = 0

ti1 = Date.now()

list.length = list.length - 1

dt1 = Date.now() - ti1

ti2 = Date.now()

list2.length = list2.length - 1

dt2 = Date.now() - ti2


console.log("tempo de execucão do método para array de tamanho 1 milhão: ", dt1 ,"\n" , "tempo de execucão do método para array de tamanho 1 : ", dt2)

// Alterar o tamanho de um array com 1 vértice ou 1 milhao de vértices utilizando length  = length - 1
//custa tempo '0' , então é O ( 1)

