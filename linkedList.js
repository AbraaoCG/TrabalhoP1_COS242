class LinkedList {
    constructor(v0 = null) {
        this.head = v0 === null ? null : new ListNode(v0)
        this.last = this.head

    }

    append(v){
        if (this.head == null) {
            this.head = new ListNode(v);
            this.last = this.head;
        } else {
            this.last.next = new ListNode(v) // crio um no como proximo do ultimo
	    this.last.next.previous = this.last // Defino o Anterior do no criado
            this.last = this.last.next // o ultimo no se torna o no
        }

	return this.last
    }
}

class ListNode { // Classe no para lista encadeada
    constructor(data) {
        this.data = data
        this.next = null
	this.previous = null                
    }

    delete(){
	if () //head{
		
	}
	if () //middle{
	
	}
	if()  // end{
	
	}
    }

}

module.exports = LinkedList; // Export class

