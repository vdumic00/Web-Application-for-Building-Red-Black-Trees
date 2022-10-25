import RedBlackNode from "./RedBlackNode";
import FixingRedProperty from "./FixingRedProperty";
import BSTInsertNode from "./BSTInsertNode";
import { UpdateNodeMap, UpdateNodePath } from "./SupportFunctions";

// Ubacivanje novog čvora s vrijednošću 'data'
export const InsertNodeAt = ({ tree, parent, direction, data }) => {
  const newNode = RedBlackNode({ data: data });
  newNode.parent = parent;
  const newId = "id" + data.toString();
  newNode.id = newId;
  newNode.direction = direction;
  tree.nodeMap[newId] = newNode;

  if (direction === "ROOT") {
    tree.root = newNode;
  } else if (direction === "LEFT") {
    newNode.nodePath = parent.nodePath + "L";
    parent.left = newNode;
  } else if (direction === "RIGHT") {
    newNode.nodePath = parent.nodePath + "R";
    parent.right = newNode;
  }

  return newId;
};

// Funkcija koja se poziva prilikom stvaranja novog čvora i obavlja sve potrebne operacije
const InsertNode = ({ tree, data }) => {
  const newId = BSTInsertNode({ tree: tree, node: tree.root, data: data });

  FixingRedProperty({ tree: tree, node: tree.nodeMap[newId] });
  UpdateNodePath({ tree: tree, node: tree.root, nodePath: "" });
  UpdateNodeMap({ tree: tree });

  return;
};

export default InsertNode;
