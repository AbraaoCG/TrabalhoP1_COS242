const fs = require('fs');
class Graph{ // Classe Base para Grafos
    constructor(Input_txt_data,Graph_Type){
        switch (Graph_Type) {
            case 0: // Matrix de adj.
                let Graph_M = new Adjacency_matrix(Input_txt_data)
                //console.log(x.n)
                this.Graph_Struct = Graph_M.Matrix
                this.n = Graph_M.n
                this.m = Graph_M.m
                
                console.log(this.Graph_Struct,this.n, this.m)
                break;
            case 1: // Lista de adj.
                let Graph_L = new Adjacency_List(Input_txt_data)
                this.Graph_Struct = Graph_L.VetorN
                this.n = Graph_L.n
                this.m = Graph_L.m
                console.log(this.Graph_Struct,this.n, this.m)

                break
            case 2: // Vetor de adj.
              
                break;
            default:
              console.log("O armazenamento do Grafo deve ser feito em : \n1-Matriz de adjacências.\n2-Lista de adjacências.\n3-Vetor de adjacências");
          }
          
    }
}

class Adjacency_matrix { //Classe para incializar matriz de ajacencia
    constructor(input) {
        //this.n, this.m, this.matrix = this.read_input(txt);
        this.Assembly_Matrix(input)
    }

    Assembly_Matrix(input) {
        try {
            let data = fs.readFileSync(input, 'utf8');
            
            // Definir num. de vértices.
            this.n = parseInt(data[0])

            // retirar "n" dos dados e definir m(núm. de arestas).
            
            data = data.slice(2)
            data = data.concat(" ") // Todas linhas tem 4 caracteres agora (A última tinha 3) 
            this.m =  (data.length) /4  // cada linha de aresta contabiliza 4 caracteres.

            //Inicializar Matrix com 2 iteraçõe (linha x Coluna)
            let Matrix =  new Array(this.n)
            for (let i = 0 ; i < this.n ; i++){
                Matrix[i] = new Array(this.n)
                for (let j = 0 ; j < this.n ; j++){
                    Matrix[i][j] = 0
                } 
            }
            // Preencher Matrix.
            
            for (let i = 0; i < this.m ; i++){
                let v1 = parseInt(data[i * 4]) - 1  //Subtrai 1, pois vertice x, na matrix, é x-1 (0 - this.n - 1 )
                let v2 = parseInt(data[i * 4 + 2]) - 1
                Matrix[v1][v2] = 1 // Seto v1 --> v2
                Matrix[v2][v1] = 1 // Seto v2 --> v1
            }
            this.Matrix = Matrix

        } catch (err) {
            console.error(err);
        }

    }

    // Precisamos adicionar um método para obter graus mínimo, máximo, media e mediana de grau.
}
class Adjacency_List{
    constructor(input){
        this.Assembly_List(input)
    }
    Assembly_List(input){
        let data = fs.readFileSync(input, 'utf8');

        // Definir num. de vértices.
        this.n = parseInt(data[0])

        // retirar "n" dos dados e definir m(núm. de arestas).
        
        data = data.slice(2)
        data = data.concat(" ") // Todas linhas tem 4 caracteres agora (A última tinha 3) 
        this.m = ( (data.length ) /4  ) // cada linha de aresta contabiliza 4 caracteres.

        //Inicializar Vetor com listas encadeadas.
        let VetorN = new Array(this.n)
        //Preencher Vetor com arestas.
        for (let i = 0; i < this.m ; i++){
            let v1 = parseInt(data[i * 4]) - 1  //Subtrai 1, pois vertice x, na matrix, é x-1 (0 - this.n - 1 )
            let v2 = parseInt(data[i * 4 + 2]) - 1

            //Se vetor[Vx] estiver vazio, inicializo com v2, senao insere v2.
            if (VetorN[v1] == null) VetorN[v1] = new Linked_List(v2)
            else{
                VetorN[v1].append(v2)
            }
            if (VetorN[v2] == null) VetorN[v2] = new Linked_List(v1)
            else{
                VetorN[v2].append(v1)
            }

        }
        this.VetorN = VetorN
    }
}

class Linked_List{ 
    //Assumindo nao se preocupar com duplicatas no txt, cria-se classe lista encadeada.
    constructor(v0){
        this.head = new LL_node(v0)
        this.last = this.head
        this.degree = 1

    }
    append(v_next){
        this.last.next = new LL_node(v_next) 
        this.last = this.last.next 
        this.degree++
    }
}
class LL_node{ // Classe no para lista encadeada.
    constructor(insert_v){
        this.data = insert_v
        this.next = null
    }
}
let x  = new Graph("input.txt",1)




/*const fs = require('fs');

function adjacency_matrix() {
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

adjacency_matrix()*/



