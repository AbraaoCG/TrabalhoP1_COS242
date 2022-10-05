class LinkedList {
    constructor(v0 = null) {
        this.head = v0 === null ? null : new ListNode(v0)
        this.last = this.head
        this.length = v0 === null ? 0 : 1
    }

    append(v){
        if (this.head == null) {
            this.head = new ListNode(v);
            this.last = this.head;
        } else {
            this.last.next = new ListNode(v) 
            this.last = this.last.next 
        }
        this.length++
    }
}

class ListNode { // Classe no para lista encadeada
    constructor(data) {
        this.data = data
        this.next = null                
    }
}

module.exports = LinkedList; // Export class

