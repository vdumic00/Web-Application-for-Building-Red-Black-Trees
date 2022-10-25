import { LeftRotation, RightRotation } from "./RedBlackRotation";
import {
  ColorSwap,
  NodeHasRedChild,
  NodeIsLeftChild,
  SiblingNode,
  Recolor,
} from "./SupportFunctions";

// Funkcija koja balansira stablo u slučaju da prilikom brisanja u stablu nastane doubleBlack čvor
const FixingBlackProperty = ({ tree, node }) => {
  const fixingBlackProperty = (tree, node) => {
    if (node === tree.root) {
      // Došli smo do root čvora -> uklanjamo doubleBlack
      return;
    }

    const sibling = SiblingNode({ node: node });
    const parent = node.parent;

    if (sibling === null) {
      // Čvor nema brata -> bojamo roditelja u doubleBlack
      fixingBlackProperty(tree, parent);
    } else {
      if (sibling.color === "RED") {
        // Brat čvora je crven
        ColorSwap({ node1: parent, node2: sibling });
        if (NodeIsLeftChild({ node: sibling })) {
          // Brat je lijevo dijete
          RightRotation({ tree: tree, node: parent });
        } else {
          LeftRotation({ tree: tree, node: parent });
        }
        fixingBlackProperty(tree, node);
      } else {
        // Brat čvora je crn -> 3 različita slučaja
        if (NodeHasRedChild({ node: sibling })) {
          // 1. Brat ima bar jedno crveno dijete
          if (NodeIsLeftChild({ node: sibling })) {
            // Brat je lijevo dijete
            if (sibling.left && sibling.left.color === "RED") {
              // Lijevo dijete je crveno
              ColorSwap({ node1: parent, node2: sibling });
              Recolor({ node: sibling.left });
              RightRotation({ tree: tree, node: parent });

              parent.right = null;
              delete tree.nodeMap[node.id];
            } else {
              // Lijevo dijete je ili crno ili NIL čvor
              ColorSwap({ node1: sibling, node2: sibling.right });
              LeftRotation({ tree: tree, node: sibling });
              fixingBlackProperty(tree, node);
            }
          } else {
            // Brat je desno dijete
            if (sibling.right && sibling.right.color === "RED") {
              // Desno dijete je crveno
              ColorSwap({ node1: parent, node2: sibling });
              Recolor({ node: sibling.right });
              LeftRotation({ tree: tree, node: parent });

              parent.left = null;
              delete tree.nodeMap[node.id];
            } else {
              // Desno dijete je ili crno ili NIL čvor
              ColorSwap({ node1: sibling, node2: sibling.left });
              RightRotation({ tree: tree, node: sibling });
              fixingBlackProperty(tree, node);
            }
          }
        } else {
          // 3. Brat ima samo crne i NIL čvorove
          Recolor({ node: sibling });
          if (parent.color === "BLACK" || parent === null) {
            fixingBlackProperty(tree, parent);
          } else {
            parent.color = "BLACK";
          }
        }
      }
    }
  };

  return fixingBlackProperty(tree, node);
};

export default FixingBlackProperty;
