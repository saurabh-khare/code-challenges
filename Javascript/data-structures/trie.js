/**
 * Assumptions
 * 1. All inputs will only lowercase letters [a-z]
 * 2. Only non-empty words will be inserted
 */

class Node {
  constructor(char) {
    this.char = char;
    this.isWord = false;
    this.children = new Array(26);
  }
}

class Trie {
  constructor() {
    // let the root be '-'
    this.root = new Node("-");
  }

  insert(word) {
    let currNode = this.root;
    const baseCharCode = "a".charCodeAt();
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currNode.children[char.charCodeAt() - baseCharCode]) {
        currNode.children[char.charCodeAt() - baseCharCode] = new Node(char);
      }
      currNode = currNode.children[char.charCodeAt() - baseCharCode];
    }
    currNode.isWord = true;
  }

  getNode(word) {
    let currNode = this.root;
    const baseCharCode = "a".charCodeAt();
    for (let i = 0; i < word.length; i++) {
      if (!currNode.children[word.charCodeAt(i) - baseCharCode]) return null;
      currNode = currNode.children[word.charCodeAt(i) - baseCharCode];
    }
    return currNode;
  }

  /**
   * Checks if the trie contains a string with given prefix
   * @param {string} prefix
   * @returns boolean
   */
  startsWith(prefix) {
    const node = this.getNode(prefix);
    if (node === null) return false;
    return true;
  }

  /**
   * Checks if the trie contains the given word
   * @param {string} word
   * @returns boolean
   */
  search(word) {
    const node = this.getNode(word);
    if (node === null) return false;
    return node.isWord;
  }
}

const trie = new Trie();
trie.insert("saurabh");
trie.insert("khare");
console.log(trie.startsWith("sau"));
console.log(trie.startsWith("kar"));
console.log(trie.search("saurabh"));
