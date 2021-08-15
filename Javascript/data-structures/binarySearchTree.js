class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    const newNode = new Node(value);
    let currNode = this.root;
    while (true) {
      if (value < currNode.value) {
        if (!currNode.left) {
          currNode.left = newNode;
          return this;
        }
        currNode = currNode.left;
      } else {
        if (!currNode.right) {
          currNode.right = newNode;
          return this;
        }
        currNode = currNode.right;
      }
    }
  }

  traverseBfs() {
    const currNode = this.root;
    const stack = [];
    stack.push(currNode);
    while (stack.length !== 0) {
      const node = stack.shift();
      console.log(node.value);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }

  traverseDFSInOrder() {
    return this.traverseInOrder(this.root, []);
  }

  traverseDFSPreOrder() {
    return this.traversePreOrder(this.root, []);
  }

  traverseDFSPostOrder() {
    return this.traversePostOrder(this.root, []);
  }

  traverseInOrder(node, list) {
    if (node.left) this.traverseInOrder(node.left, list);
    list.push(node.value);
    if (node.right) this.traverseInOrder(node.right, list);
    return list;
  }

  traversePreOrder(node, list) {
    list.push(node.value);
    if (node.left) this.traversePreOrder(node.left, list);
    if (node.right) this.traversePreOrder(node.right, list);
    return list;
  }

  traversePostOrder(node, list) {
    if (node.left) this.traversePostOrder(node.left, list);
    if (node.right) this.traversePostOrder(node.right, list);
    list.push(node.value);
    return list;
  }

  find(value) {
    let currNode = this.root;
    let padding = "";
    while (currNode) {
      padding += " ";
      console.log(padding + currNode.value);
      if (currNode.value === value) return true;
      if (value < currNode.value) currNode = currNode.left;
      if (value > currNode.value) currNode = currNode.right;
    }
  }

  getHeight(root) {
    if (!root) return -1;
    const leftSubtreeHeight = this.getHeight(root.left);
    const rightSubtreeHeight = this.getHeight(root.right);
    return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
  }
}

const bst = new BinarySearchTree(4);
bst.insert(2);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(7);
bst.insert(6);
console.log("Traversing path to find 6");
bst.find(6);
console.log("Traversing whole tree in BFS");
bst.traverseBfs();
console.log("Height of the tree");
console.log(bst.getHeight(bst.root));
