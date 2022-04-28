const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  rootElement = null;
  data = null;
  parent = null;
  isLeft = null;

  root() {
    return this.rootElement;
  }

  addNode(currentNode, data) {
    if (data == currentNode.data) return;
    if (data < currentNode.data) {
      !(currentNode.left) ? currentNode.left = new Node(data) : this.addNode(currentNode.left, data);
    } else {
      !(currentNode.right) ? currentNode.right = new Node(data) : this.addNode(currentNode.right, data);
    }
  }

  add(data) {
    if (!this.rootElement) {
      this.rootElement = new Node(data);
    } else {
      this.addNode(this.rootElement, data);
    }
  }

  has(data) {
    this.data = data;
    return !!(this.findNode(this.rootElement));
  }

  findNode(node) {
    if (!this.data) return null;
    if (!node) return null;
    if (node.data == this.data) return node;
    this.parent = node;
    if (this.data < node.data) {
      this.isLeft = true;
      return this.findNode(node.left);
    } else {
      this.isLeft = false;
      return this.findNode(node.right);
    }
  }

  find(data) {
    this.data = data;
    let res = this.findNode(this.rootElement);
    return res;
 }

  remove(data) {
    this.parent = null;
    this.isLeft = null;
    this.data = data;

    let res = this.findNode(this.rootElement);

    if (!res.left && !res.right) {
      this.isLeft ? this.parent.left = null : this.parent.right = null;
    } else if (!res.left) {
      this.isLeft ? this.parent.left = res.right : this.parent.right = res.right;
    } else  if (!res.right) {
      this.isLeft ? this.parent.left = res.left : this.parent.right = res.left;
    } else {

      let minResRight = res.right;
      console.log('min ' + minResRight)
      while (minResRight.left) {
        minResRight = minResRight.left;
      }
      minResRight.left = res.left;
      if (this.isLeft === null) {
        this.rootElement = res.right;
      } else {
        this.isLeft ? this.parent.left = res.right : this.parent.right = res.right;
      }
    }
}

  min() {
    let x = this.rootElement
    while (x.left) {
      x = x.left;
    }
    return x.data;
  }

  max() {
    let y = this.rootElement
    while (y.right) {
      y = y.right;
    }
    return y.data;
  }
}


module.exports = {
  BinarySearchTree
};