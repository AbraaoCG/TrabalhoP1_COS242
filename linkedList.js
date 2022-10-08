class LinkedList {
    constructor(v0 = null) {
        this.head = v0 === null ? null : new ListNode(v0)
        this.last = this.head

    }

    append(v){
        if (this.head == null) {
            this.head = new ListNode(v,this);
            this.last = this.head;
        } else {
            this.last.next = new ListNode(v,this) // crio um no como proximo do ultimo
	    this.last.next.previous = this.last // Defino o Anterior do no criado
            this.last = this.last.next // o ultimo no se torna o no
        }

	return this.last
    }
}

class ListNode { // Classe no para lista encadeada
    constructor(data,linkedL) {
        this.data = data
        this.next = null
	    this.previous = null
        this.linkedL = linkedL          
    }

    delete(){
        
        let [p,n] = [this.previous , this.next]
        if ( p === null &  n === null){ //head alone (retira o único elemento da lista)
            this.data = null //Data do nó recebe nulo ; não elimina o nó, mas identifica que a lista está vazia.
        }
        if (p === null & n !== null){ //head --> node (retira a cabeça)
            
            this.next.previous = null
            this.linkedL.head = this.next
            
            
        }
        if (p !== null & n !== null){ //middle
            this.previous.next = this.next
            this.next.previous = this.previous
        }
        if(p !== null &  n === null ){  // end
            this.linkedL.last = this.previous
            this.previous.next = null
        }
    }

}

module.exports = LinkedList; // Export class

