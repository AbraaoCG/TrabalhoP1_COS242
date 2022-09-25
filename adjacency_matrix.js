const fs = require('fs');

class Adjacency_matrix {
    constructor(input) {
        //this.n, this.m, this.matrix = this.read_input(txt);
    }

    Assembly_Matrix(txt) {
        try {
            let data = fs.readFileSync('input.txt', 'utf8');
            
            // Definir num. de vértices e tamanho da string com dados.
            this.n = parseInt(data[0])
            let numCaract = 2 +  3 * this.n // linha inicial = 2 Caracteres("n "); Para cada Aresta = "X Y" = 3 Caracteres ; 
            
            //Criar nova
            //console.log(data[numCaract - 1]) 
            data = data.slice(2)
            console.log(data)

            //data = data.





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



