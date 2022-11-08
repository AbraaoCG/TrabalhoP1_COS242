class Heap extends Array {
    constructor(n, controlIndex = null, ...args) {
        super(...args);
        this.length = n;
        this.size = -1; 
        if (controlIndex !== null) {
            this.heapIndex = new Array(n);
            this.rootIndex = null;
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
        while (i > 0 && this[this.parent(i)] > this[i]) {
            // Swap parent and current node
            this.swap(this.parent(i), i);
            // Update i to parent of i
            i = this.parent(i);
        };
    };

    swap(i, j) {
        let temp = this[i];
        this[i] = this[j];
        this[j] = temp;

        if (this.heapIndex !== null) this.swapIndex(i, j);
    };

    swapIndex(i, j) {
       // Guardamos o vértice da raiz, isto é, o índice onde o heapIndex é 0  // QUEREMOS SABER QUEM É O VÉRTICE QUE ESTÁ NO HEAP[0]
       if (this.heapIndex[i] === 0) this.rootIndex = i;

        let temp = this.heapIndex[i];
        this.heapIndex[i] = this.heapIndex[j];
        this.heapIndex[j] = temp;
    };

    // Function to shift down the node in order to maintain the heap property
    shiftDown(i) {
        let minIndex = i;
    
        // Left Child
        let l = this.leftChild(i);
    
        if (l <= this.size && this[l] < this[minIndex]) {
            minIndex = l;
        };
    
        // Right Child
        let r = this.rightChild(i);
    
        if (r <= this.size && this[r] < this[minIndex]) {
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
        let rootPriority = this[0];  
        
        // Deseja-se então, remover nó da raiz da Heap, fazendo uma substituição com o último peso da Heap e adequando-o à fila de prioridade (ShiftDown)
        this.swap(0, this.size);
        this.size = this.size - 1;
        this.length = this.length - 1;
        if (this.heapIndex !== null) this.heapIndex.length = this.heapIndex.length - 1;
        this.shiftDown(0);

        // Retorna o resultado desejado após retirada da raiz.
        if (this.heapIndex !== null) {
            return [rootPriority, this.rootIndex];
        } else {
            return rootPriority;
        };
    };

    // Function to change the priority of an element
    changePriority(i, p) {
        let oldp = this[i];
        this[i] = p;
    
        if (p < oldp) {
            this.shiftUp(i);
        } else {
            this.shiftDown(i);
        };
    };

    // Function to get value of the current maximum element
    getMin() {
        return this[0];
    };
 
    // Function to remove the element located at given index
    remove(i) {
        this[i] = this.getMin() + 1;
    
        // Shift the node to the root of the heap
        this.shiftUp(i);
    
        // Extract the node
        this.extractMax();
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