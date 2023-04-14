const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }
  add(data) {
    const node = {
      data: data,
      left: null,
      right: null
    };

    if (!this._root) {
      this._root = node;
      return;
    }

    let current = this._root;

    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  find(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    let parent = null;
    let current = this._root;

    while (current && current.data !== data) {
      parent = current;

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (!current) {
      return;
    }

    if (!current.left && !current.right) {
      if (current === this._root) {
        this._root = null;
      } else if (current === parent.left) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.left && current.right) {
      let successorParent = current.right;
      let successor = current.right;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successor !== current.right) {
        successorParent.left = successor.right;
        successor.right = current.right;
      }

      if (current === this._root) {
        this._root = successor;
      } else if (current === parent.left) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      successor.left = current.left;
    } else {
      let child = current.left || current.right;

      if (current === this._root) {
        this._root = child;
      } else if (current === parent.left) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
  }

  min() {
    if (!this._root) {
      return null;
    }

    let current = this._root;

    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let current = this._root;

    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};