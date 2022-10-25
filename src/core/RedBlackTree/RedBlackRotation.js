import { UpdateNodePath } from "./SupportFunctions";

// Lijeva rotacija čvora
export const LeftRotation = ({ tree, node }) => {
  const nodeDirection = node.direction;
  const tempNode = node.right;
  node.right = tempNode.left;

  if (node.right !== null) {
    node.right.direction = "RIGHT";
  }

  node.direction = "LEFT";
  tempNode.direction = nodeDirection;

  if (node.right !== null) {
    node.right.parent = node;
  }

  if (node.parent === null) {
    tree.root = tempNode;
    tempNode.parent = null;
  } else {
    if (node === node.parent.left) {
      node.parent.left = tempNode;
    } else if (node === node.parent.right) {
      node.parent.right = tempNode;
    }
    tempNode.parent = node.parent;
  }

  tempNode.left = node;
  node.parent = tempNode;

  UpdateNodePath({ tree: tree, node: tree.root, nodePath: "" });

  return;
};

// Desna rotacija čvora
export const RightRotation = ({ tree, node }) => {
  const nodeDirection = node.direction;
  const tempNode = node.left;
  node.left = tempNode.right;

  if (node.left !== null) {
    node.left.direction = "LEFT";
  }

  node.direction = "RIGHT";
  tempNode.direction = nodeDirection;

  if (node.left !== null) {
    node.left.parent = node;
  }

  if (node.parent === null) {
    tree.root = tempNode;
    tempNode.parent = null;
  } else {
    if (node === node.parent.left) {
      node.parent.left = tempNode;
    } else if (node === node.parent.right) {
      node.parent.right = tempNode;
    }
    tempNode.parent = node.parent;
  }

  tempNode.right = node;
  node.parent = tempNode;

  UpdateNodePath({ tree: tree, node: tree.root, nodePath: "" });

  return;
};
