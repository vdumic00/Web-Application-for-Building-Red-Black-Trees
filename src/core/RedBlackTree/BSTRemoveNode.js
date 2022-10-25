import FixingBlackProperty from "./FixingBlackProperty";
import { DataSwap, NodeIsLeftChild, SuccessorNode } from "./SupportFunctions";

const BSTRemoveNode = ({ tree, data }) => {
  const removeNode = (tree, node, data) => {
    console.log("brisanje čvora", data);
    if (node === null) {
      // Root čvor je null -> stablo je prazno
      console.log("Stablo je prazno!");
      return null;
    }

    if (data === node.data) {
      // Pronašli smo čvor kojeg želimo izbrisati
      if (node.left === null && node.right === null) {
        // Čvor kojeg želimo izbrisati je list
        if (node === tree.root) {
          // U stablu postoji samo root čvor -> kad ga obrišemo stablo postaje prazno
          tree.root = null;
          return;
        } else if (node.color === "RED") {
          // Čvor je crven i nema djece -> samo ga uklonimo
          if (NodeIsLeftChild({ node: node })) {
            node.parent.left = null;
          } else {
            node.parent.right = null;
          }
        } else {
          // Čvor je crn i nema djece -> tretiramo ga kao doubleBlack čvor
          FixingBlackProperty({ tree: tree, node: node });
        }
      } else if (node.left === null && node.right !== null) {
        // Čvor ima samo desno dijete
        DataSwap({ node1: node, node2: node.right });
        removeNode(tree, node.right, data);
      } else if (node.left !== null && node.right === null) {
        // Čvor ima samo lijevo dijete
        DataSwap({ node1: node, node2: node.left });
        removeNode(tree, node.left, data);
      } else {
        // Čvor ima oba djeteta
        const successor = SuccessorNode({ node: node });
        DataSwap({ node1: node, node2: successor });
        removeNode(tree, node.right, data);
      }
    } else if (data < node.data) {
      removeNode(tree, node.left, data);
      return;
    } else if (data > node.data) {
      removeNode(tree, node.right, data);
      return;
    }
  };

  return removeNode(tree, tree.root, data);
};

export default BSTRemoveNode;
