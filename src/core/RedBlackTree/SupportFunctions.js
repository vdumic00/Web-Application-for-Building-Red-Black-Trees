// Pretraga čvora po vrijednosti
export const FindNode = ({ tree, data }) => {
  if (tree.root === null) {
    return null;
  }

  const searchForNode = (node, data) => {
    if (node.data === data) {
      return node;
    } else if (data < node.data) {
      if (node.left === null) {
        return null;
      }
      return searchForNode(node.left, data);
    } else if (data > node.data) {
      if (node.right === null) {
        return null;
      }
      return searchForNode(node.right, data);
    }
  };
  return searchForNode(tree.root, data);
};

// Zamjena boja dvaju čvorova
export const ColorSwap = ({ node1, node2 }) => {
  const temp = node1.color;
  node1.color = node2.color;
  node2.color = temp;

  return;
};

// Zamjena vrijednosti dvaju čvorova
export const DataSwap = ({ node1, node2 }) => {
  const temp = node1.data;
  const tempId = node1.id;
  node1.data = node2.data;
  node1.id = node2.id;
  node2.data = temp;
  node2.id = tempId;

  return;
};

// Funkcija za traženje krajnjeg lijevog čvora u desnom podstablu
export const SuccessorNode = ({ node }) => {
  let successor = node.right;
  while (successor.left !== null) {
    successor = successor.left;
  }

  return successor;
};

// Funckija koja vraća čvor brata
export const SiblingNode = ({ node }) => {
  return node === node.parent.left ? node.parent.right : node.parent.left;
};

// Funckija koja provjerava je li čvor lijevo dijete
export const NodeIsLeftChild = ({ node }) => {
  return node === node.parent.left ? true : false;
};

// Funkcija koja provjerava ima li čvor barem jedno crveno dijete
export const NodeHasRedChild = ({ node }) => {
  return (
    (node.left && node.left.color === "RED") ||
    (node.right && node.right.color === "RED")
  );
};

// Funkcija za promjenu boje čvora
export const Recolor = ({ node }) => {
  if (node.color === "RED") {
    node.color = "BLACK";
  } else {
    node.color = "RED";
  }
};

// Funkcija za provjeru je li riječ o root čvoru
export const NodeIsRoot = ({ node }) => {
  return node.parent === null;
};

// Funkcija koja vraća čvor djeda
export const GrandParent = ({ node }) => {
  if (NodeIsRoot({ node: node })) {
    return null;
  } else {
    return node.parent.parent;
  }
};

// Funkcija koja vraća čvor ujaka
export const Uncle = ({ node }) => {
  const grandParent = GrandParent({ node: node });

  if (NodeIsRoot({ node: node })) {
    return null;
  } else if (grandParent === null) {
    return null;
  } else {
    if (grandParent.left === node.parent) {
      return grandParent.right;
    } else {
      return grandParent.left;
    }
  }
};

// Dohvaćanje čvora
export const GetNode = ({ tree, nodeId }) => {
  if (nodeId === null || nodeId === "null") {
    return null;
  }

  // Tražimo čvor u stablu prema ID-u čvora
  const node = tree.nodeMap[nodeId];
  if (typeof node === "undefined") {
    return null;
  } else {
    return node;
  }
};

// Obrada čvora
export const RenderNode = ({ tree, node, map, level }) => {
  const levelKey = level.toString();

  if (map[levelKey] === undefined) {
    map[levelKey] = [];
  }

  if (node !== null) {
    // Dodamo trenutni čvor u mapu
    map[levelKey].push(node.id);

    // Dodajemo lijevo dijete čvora
    RenderNode({
      tree: tree,
      node: node.left,
      map: map,
      level: level + 1,
    });

    // Dodajemo desno dijete čvora
    RenderNode({
      tree: tree,
      node: node.right,
      map: map,
      level: level + 1,
    });
  }
};

// Obrada stabla
export const RenderTree = ({ tree }) => {
  const map = [];
  RenderNode({ tree: tree, node: tree.root, map: map, level: 0 });
  return map;
};

// Ažuriranje puta do čvora
export const UpdateNodePath = ({ tree, node, nodePath }) => {
  if (node === null) {
    return;
  }

  let newNodePath = "";

  if (NodeIsRoot({ node: node })) {
    // Ako je čvor root ne postoji poseban put do njega
    newNodePath = "";
  } else {
    // Ako je čvor lijevo dijete njegov smjer je 'L', u suprotnom je 'R'
    const pathStep = node.direction === "LEFT" ? "L" : "R";
    newNodePath = nodePath + pathStep;
  }
  node.nodePath = newNodePath;

  UpdateNodePath({ tree: tree, node: node.left, nodePath: newNodePath });
  UpdateNodePath({ tree: tree, node: node.right, nodePath: newNodePath });
};

// Rekurzivno dohvaćanje mape puteva
export const GetRecursivePathMap = ({ tree, node, map }) => {
  if (node === null) {
    return map;
  }

  const left = node.left;
  const right = node.right;

  // Ako postoji lijevo dijete definiramo put od roditelja do djeteta
  if (left !== null) {
    const id = node.id + left.id;
    map[id] = { from: node.id, to: left.id };

    // Ažuriramo mapu puteva za čvor lijevog djeteta
    GetRecursivePathMap({ tree: tree, node: node.left, map: map });
  }

  // Ako postoji desno dijete definiramo put od roditelja do djeteta
  if (right !== null) {
    const id = node.id + right.id;
    map[id] = { from: node.id, to: right.id };

    // Ažuriramo mapu puteva za čvor desnog djeteta
    GetRecursivePathMap({ tree: tree, node: node.right, map: map });
  }
};

// Dohvaćanje mape puteva
export const PathMap = ({ tree }) => {
  const pathMap = {};
  GetRecursivePathMap({ tree: tree, node: tree.root, map: pathMap });

  return pathMap;
};

export const GetRecursiveNodeMap = ({ tree, node }) => {
  if (node === null) {
    return;
  }

  if (tree.root === node) {
    tree.nodeMap[node.id] = node;
  }

  const left = node.left;
  const right = node.right;

  // Ako postoji lijevo dijete definiramo put od roditelja do djeteta
  if (left !== null) {
    tree.nodeMap[left.id] = left;

    // Ažuriramo mapu puteva za čvor lijevog djeteta
    GetRecursiveNodeMap({ tree: tree, node: node.left });
  }

  // Ako postoji desno dijete definiramo put od roditelja do djeteta
  if (right !== null) {
    tree.nodeMap[right.id] = right;

    // Ažuriramo mapu puteva za čvor desnog djeteta
    GetRecursiveNodeMap({ tree: tree, node: node.right });
  }
};

export const UpdateNodeMap = ({ tree }) => {
  GetRecursiveNodeMap({ tree: tree, node: tree.root });

  return;
};
