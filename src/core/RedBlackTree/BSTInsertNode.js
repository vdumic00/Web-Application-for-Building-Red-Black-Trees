import { InsertNodeAt } from "./InsertNode";

// Pronalazimo poziciju za smještanje novog čvora i ubacujemo ga u stablo
const BSTInsertNode = ({ tree, node, data }) => {
  const insertNode = (tree, node, data) => {
    if (node === null) {
      // Stablo je prazno -> ubacujemo čvor
      const newId = InsertNodeAt({
        tree: tree,
        parent: node,
        direction: "ROOT",
        data: data,
      });
      return newId;
    } else {
      if (node.data > data) {
        if (node.left === null) {
          // Ubacujemo čvor kao lijevo dijete
          const newId = InsertNodeAt({
            tree: tree,
            parent: node,
            direction: "LEFT",
            data: data,
          });
          return newId;
        } else {
          // Tražimo poziciju u lijevom podstablu
          return insertNode(tree, node.left, data);
        }
      } else {
        if (node.right === null) {
          // Ubacujemo čvor kao desno dijete
          const newId = InsertNodeAt({
            tree: tree,
            parent: node,
            direction: "RIGHT",
            data: data,
          });
          return newId;
        } else {
          // Tražimo poziciju u desnom podstablu
          return insertNode(tree, node.right, data);
        }
      }
    }
  };

  return insertNode(tree, node, data);
};

export default BSTInsertNode;
