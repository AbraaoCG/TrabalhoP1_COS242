class Heap extends Array {
    constructor(n, controlIndex = null, ...args) {
        super(...args);
        this.length = n;
        this.size = -1; 
        if (controlIndex !== null) {
            this.heapIndex = new Array(n);
            this.rootVertex = null;
        } else {
            this.heapIndex = null;
        };
    };

    // Return the index of the parent node of a given node
    parent(i) {
        return parseInt((i - 1) / 2);
    };

    // Return the index of the left child of the given node
    leftChild(i) {
        return parseInt((2 * i) + 1);
    };

    // Return the index of the right child of the given node
    rightChild(i) {
        return parseInt((2 * i) + 2);
    };

    shiftUp(i) {
        while (i > 0 && this[this.parent(i)][0] > this[i][0] ) {
            // Swap parent and current node
            this.swap(this.parent(i), i);
            // Update i to parent of i
            i = this.parent(i);
        };
    };

    swap(i, j) {
        if (this.heapIndex !== null) this.swapIndex(i, j);

        let temp = this[i];
        this[i] = this[j];
        this[j] = temp;

        if (this.heapIndex[i] === 0) this.rootVertex = this[i][1]; // Matenho informação de quem é a raiz
        if (this.heapIndex[j] === 0) this.rootVertex = this[j][1];
    };

    swapIndex(i , j ) {
       // Troca de posição no Array swapIndex.
        this.heapIndex[this[i][1]] = j
        this.heapIndex[this[j][1]] = i
    };

    // Function to shift down the node in order to maintain the heap property
    shiftDown(i) {
        let minIndex = i;
    
        // Left Child
        let l = this.leftChild(i);
    
        if (l <= this.size && this[l][0] < this[minIndex][0] ) {
            minIndex = l;
        };
    
        // Right Child
        let r = this.rightChild(i);
    
        if (r <= this.size && this[r][0] < this[minIndex][0] ) {
            minIndex = r;
        };
    
        // If i not same as minIndex
        if (i != minIndex) {
            this.swap(i, minIndex);
            this.shiftDown(minIndex); 
        };
    };

    // Function to insert a new element in the Binary Heap
    insert(p) {
        this.size ++;
        this[this.size] = p;

        // Shift Up to maintain heap property
        this.shiftUp(this.size);
    };

    // Function to extract the element with minimum priority
    extractMin() {
        // Armazena para retornar posteriomente o peso da aresta de menor peso e qual aresta é essa.
        let root = this[0];
        
        // Deseja-se então, remover nó da raiz da Heap, fazendo uma substituição com o último peso da Heap e adequando-o à fila de prioridade (ShiftDown)
        this.swap(0, this.size);
        this.size = this.size - 1;
        this.length = this.length - 1;
        //if (this.heapIndex !== null) this.heapIndex.length = this.heapIndex.length - 1;
        this.shiftDown(0);

        // Retorna o resultado desejado após retirada da raiz.
        if (this.heapIndex !== null) {
            // console.log(root)
            return root
        } else {
            return root[0]
        };
    };

    // Function to change the priority of an element
    changePriority( i, p) {
        let oldp = this[i][0];
        this[i][0] = p;
    
        if (p < oldp) {
            this.shiftUp(i);
        } else {
            this.shiftDown(i);
        };
    };

    // Function to get value of the current maximum element
    getMin() {
        return this[0][0];
    };
 
};

module.exports = Heap; // Export class
/*let heapIndex = [0,1,2,3,4,5];
myHeap = new Heap(7); 
myHeap.insert(7);
myHeap.insert(8);
myHeap.insert(10);
myHeap.insert(9);
myHeap.insert(12);
myHeap.insert(15);
myHeap.insert(5);
console.log(myHeap);
myHeap.extractMin();
console.log(myHeap);*/

// array de indices = [Infinity, Infinity, Infinity, Infinity, Infinity]