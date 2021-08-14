class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  insert(value, index) {
    const newNode = new Node(value);
    let currNode = this.traverseToIndex(index);
    let temp = currNode.next;
    currNode.next = newNode;
    newNode.next = temp;
    this.length++;
    return this;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  print() {
    let currNode = this.head;
    while (currNode) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }

  traverseToIndex(index) {
    if (this.length < index) {
      throw new Error("index out of bounds");
    }
    let counter = 0;
    let currNode = this.head;
    while (counter++ !== index) {
      currNode = currNode.next;
    }
    return currNode;
  }

  reverse() {
    let currNode = this.head;
    this.tail = this.head;
    let nextNode = currNode.next;
    let holder = currNode.next.next;
    while (nextNode) {
      nextNode.next = currNode;
      currNode = nextNode;
      nextNode = holder;
      if (holder) {
        holder = holder.next;
      }
    }
    this.tail.next = null;
    this.head = currNode;
  }
}

const l = new LinkedList(5);
l.append(10);
l.append(20);
l.append(30);
l.append(40);
l.prepend(0);
l.insert(15, 2);
l.print();
l.reverse();
console.log("**************reverse list*******************");
l.print();
