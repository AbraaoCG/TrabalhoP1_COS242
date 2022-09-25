const fs = require('fs');
class Graph{ // Classe Base para Grafos
    constructor(Input_txt_data,Graph_Type){
        switch (Graph_Type) {
            case 0: // Matrix de adj.
                let Graph_Object = new Adjacency_matrix(Input_txt_data)
                //console.log(x.n)
                this.Graph_Struct = Graph_Object.Matrix
                this.n = Graph_Object.n
                this.m = Graph_Object.m
                
                console.log(this.Graph_Struct,this.n, this.m)
                break;
            case 1: // Lista de adj.

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
            this.m = ( (data.length ) /4  ) // cada linha de aresta contabiliza 4 caracteres.

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

}


let x  = new Graph("input.txt",0)




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



