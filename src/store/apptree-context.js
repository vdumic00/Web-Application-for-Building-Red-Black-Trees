import React from "react";

import RedBlackTree from "../core/RedBlackTree/RedBlackTree";

const AppTreeContext = React.createContext({
  redBlackTree: RedBlackTree(),
  insertRedBlackNode: (value) => {},
  removeRedBlackNode: (value) => {},
  treeState: {
    dimensions: {
      width: 700,
      height: 700,
    },
    nodes: [],
    paths: [],
    prevNodes: {},
    prevPaths: {},
  },
  updateNodesPaths: (nodes, prevNodes, paths, prevPaths) => {},
  restartTree: () => {},
});

export default AppTreeContext;
