const fs = require('fs');

class Adjacency_matrix {
    constructor(input) {
        //this.n, this.m, this.matrix = this.read_input(txt);
    }

    Assembly_Matrix(txt) {
        try {
            let data = fs.readFileSync('input.txt', 'utf8');
            
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
            console.log(Matrix)

        } catch (err) {
            console.error(err);
        }
    }
}

const myArray = new Adjacency_matrix("aa");
myArray.Assembly_Matrix();



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



