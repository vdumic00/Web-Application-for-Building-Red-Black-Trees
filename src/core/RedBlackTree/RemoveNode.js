import BSTRemoveNode from "./BSTRemoveNode";
import { UpdateNodePath, UpdateNodeMap } from "./SupportFunctions";

// Pozivanje svih potrebnih funckija prilikom brisanja čvora
const RemoveNode = ({ tree, data }) => {
  BSTRemoveNode({ tree: tree, data: data });
  UpdateNodePath({ tree: tree, node: tree.root, nodePath: "" });
  UpdateNodeMap({ tree: tree });

  return;
};

export default RemoveNode;
