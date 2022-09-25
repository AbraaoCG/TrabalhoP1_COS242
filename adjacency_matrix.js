const fs = require('fs');

function adjacency_matrix() {
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

adjacency_matrix()



