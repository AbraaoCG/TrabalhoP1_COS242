const fs = require('fs');
const os = require('os');

class WeightGraph { // Classe base para grafos com pesos
    constructor(inputPath) {
        [this.n, this.m, this.struct] = this.readInput(inputPath);
    };

    writeOutput(textList) { // Função que escreve no arquivo output.txt
        fs.appendFileSync('output.txt', '\n');        
        for (let i = 0; i < textList.length; i++) {
            fs.appendFileSync('output.txt', `${textList[i]}`);
        }
    }

    readInput(inputPath) {
        let data = fs.readFileSync(inputPath, 'utf8'); // Faz a leitura do arquivo de input
        // https://stackoverflow.com/questions/15433188/what-is-the-difference-between-r-n-r-and-n/15433263#15433263
        data = data.toString().replace(/\r\n/g,'\n').split('\n'); // Armazena cada linha do arquivo em um vetor
   
        // Define num. de vértices
        const n = parseInt(data[0]);
        // Define num. de arestas
        const m = data.length - 1; // O número de arestas será o tamanho do vetor menos 1 (linha que informa o número de vértices do grafo)

        // Constrói a estrutura inicial e o método de preenchimento para cada uma das representações
        let [fillMethod, struct] = this.buildInitialStruct(n);

        // Preenche uma das tres Estruturas, vetor de graus e a soma dos graus
        for (let i = 1; i < m + 1 ; i++) {
            let [v1, v2, weight] = data[i].split(' ').map((n) => parseFloat(n));
            struct = fillMethod(v1, v2, weight, struct); // Estrutura de dados preenchida com o método definido na subclasse
        };

        return [n, m, struct];
    };
};

module.exports = WeightGraph; // Export class
