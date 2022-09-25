const fs = require('fs');

class Adjacency_matrix {
    constructor(input) {
        //this.n, this.m, this.matrix = this.read_input(txt);
    }

    read_file(txt) {
        try {
            const data = fs.readFileSync('input.txt', 'utf8');
            console.log(type(data));
            
            nv = int(data[0])
            console.log(nv)

        } catch (err) {
            console.error(err);
        }
    }
}

const myArray = new Adjacency_matrix("aa");
myArray.read_file();


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



