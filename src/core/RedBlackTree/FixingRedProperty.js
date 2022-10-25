import { LeftRotation, RightRotation } from "./RedBlackRotation";
import { GrandParent, NodeIsRoot, Recolor, Uncle } from "./SupportFunctions";

// Funkcija koja balansira stablo u slučaju da se pojave dva uzastopna crvena čvora
const FixingRedProperty = ({ tree, node }) => {
  const fixingRedProperty = (tree, node) => {
    if (node === null) {
      return;
    }

    if (node === tree.root && node.color === "BLACK") {
      return;
    }

    if (NodeIsRoot({ node: node }) && node.color === "RED") {
      // Riječ je o root čvoru crvene boje -> prebojavamo ga u crno
      Recolor({ node: node });
      return;
    }

    const parent = node.parent;
    const grandParent = GrandParent({ node: node });
    const uncle = Uncle({ node: node });

    if (parent.color === "BLACK" || parent === null) {
      // Roditelj čvora je crn -> izlazimo iz operacije
      return;
    }

    if (uncle !== null && uncle.color === "RED") {
      // Stric čvora je crven -> prebojavamo čvorove
      Recolor({ node: parent });
      Recolor({ node: uncle });
      Recolor({ node: grandParent });

      fixingRedProperty(tree, grandParent);
    } else {
      // Stric čvora je crn -> rotiramo i prebojavamo čvorove
      if (parent === grandParent.left) {
        // Roditelj je lijevo dijete
        if (node === parent.right) {
          // Čvor je desno dijete
          // Lijevo - Desna rotacija
          LeftRotation({ tree: tree, node: parent });
          RightRotation({ tree: tree, node: grandParent });
        } else {
          // Čvor je lijevo dijete
          // Desna rotacija djeda
          RightRotation({ tree: tree, node: grandParent });
          node = node.parent;
        }
        Recolor({ node: node });
        Recolor({ node: grandParent });
        node = node.parent;
      } else {
        // Roditelj je desno dijete
        if (node === parent.left) {
          // Čvor je lijevo dijete
          // Desno - Lijeva rotacija
          RightRotation({ tree: tree, node: parent });
          LeftRotation({ tree: tree, node: grandParent });
        } else {
          // Čvor je desno dijete
          // Lijeva rotacija djeda
          LeftRotation({ tree: tree, node: grandParent });
          node = node.parent;
        }
        Recolor({ node: node });
        Recolor({ node: grandParent });
        node = node.parent;
      }
      fixingRedProperty(tree, node);
    }
    tree.root.color = "BLACK";
  };

  return fixingRedProperty(tree, node);
};

export default FixingRedProperty;
