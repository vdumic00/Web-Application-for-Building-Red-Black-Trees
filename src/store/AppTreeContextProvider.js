import React, { useReducer } from "react";

import AppTreeContext from "./apptree-context";

import { FindNode } from "../core/RedBlackTree/SupportFunctions";
import InsertNode from "../core/RedBlackTree/InsertNode";
import RemoveNode from "../core/RedBlackTree/RemoveNode";
import RedBlackTree from "../core/RedBlackTree/RedBlackTree";

const defaultAppState = {
  redBlackTree: RedBlackTree(),
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
};

const treeReducer = (state, action) => {
  if (action.type === "INSERT RED BLACK") {
    if (FindNode({ tree: state.redBlackTree, data: action.value })) {
      alert(`Čvor s vrijednošću ${action.value} već postoji!`);
      return {
        redBlackTree: state.redBlackTree,
        binarySearchTree: state.binarySearchTree,
        treeState: {
          dimensions: state.treeState.dimensions,
          nodes: state.treeState.nodes,
          paths: state.treeState.paths,
          prevNodes: state.treeState.prevNodes,
          prevPaths: state.treeState.prevNodes,
        },
      };
    }

    InsertNode({ tree: state.redBlackTree, data: action.value });

    return {
      redBlackTree: state.redBlackTree,
      binarySearchTree: state.binarySearchTree,
      treeState: {
        dimensions: state.treeState.dimensions,
        nodes: state.treeState.nodes,
        paths: state.treeState.paths,
        prevNodes: state.treeState.prevNodes,
        prevPaths: state.treeState.prevNodes,
      },
    };
  }

  if (action.type === "REMOVE RED BLACK") {
    if (!FindNode({ tree: state.redBlackTree, data: action.value })) {
      alert(`Čvor s vrijednošću ${action.value} ne postoji!`);
      return {
        redBlackTree: state.redBlackTree,
        binarySearchTree: state.binarySearchTree,
        treeState: {
          dimensions: state.treeState.dimensions,
          nodes: state.treeState.nodes,
          paths: state.treeState.paths,
          prevNodes: state.treeState.prevNodes,
          prevPaths: state.treeState.prevNodes,
        },
      };
    }

    RemoveNode({ tree: state.redBlackTree, data: action.value });

    return {
      redBlackTree: state.redBlackTree,
      binarySearchTree: state.binarySearchTree,
      treeState: {
        dimensions: state.treeState.dimensions,
        nodes: state.treeState.nodes,
        paths: state.treeState.paths,
        prevNodes: state.treeState.prevNodes,
        prevPaths: state.treeState.prevNodes,
      },
    };
  }

  if (action.type === "UPDATE NODES AND PATHS") {
    const newNodes = action.value.nodes;
    const newPrevNodes = action.value.prevNodes;
    const newPaths = action.value.paths;
    const newPrevPaths = action.value.prevPaths;

    return {
      redBlackTree: state.redBlackTree,
      printRedBlackTree: state.printRedBlackTree,
      binarySearchTree: state.binarySearchTree,
      treeState: {
        dimensions: state.treeState.dimensions,
        nodes: newNodes,
        paths: newPaths,
        prevNodes: newPrevNodes,
        prevPaths: newPrevPaths,
      },
    };
  }

  if (action.type === "RESTART TREE") {
    console.log("UŠLO");

    return {
      redBlackTree: RedBlackTree(),
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
    };
  }
};

const AppTreeContextProvider = (props) => {
  const [appState, dispatchTreeAction] = useReducer(
    treeReducer,
    defaultAppState
  );

  const insertRedBlackNodeHandler = (value) => {
    dispatchTreeAction({ type: "INSERT RED BLACK", value: value });
  };

  const removeRedBlackNodeHandler = (value) => {
    dispatchTreeAction({ type: "REMOVE RED BLACK", value: value });
  };

  const setRedBlackNodesPaths = (nodes, prevNodes, paths, prevPaths) => {
    dispatchTreeAction({
      type: "UPDATE NODES AND PATHS",
      value: { nodes, prevNodes, paths, prevPaths },
    });
  };

  const restartRedBlackTreeHandler = () => {
    dispatchTreeAction({ type: "RESTART TREE" });
  };

  const appTreeContext = {
    redBlackTree: appState.redBlackTree,
    insertRedBlackNode: insertRedBlackNodeHandler,
    updateNodesPaths: setRedBlackNodesPaths,
    treeState: appState.treeState,
    removeRedBlackNode: removeRedBlackNodeHandler,
    restartTree: restartRedBlackTreeHandler,
  };

  return (
    <AppTreeContext.Provider value={appTreeContext}>
      {props.children}
    </AppTreeContext.Provider>
  );
};

export default AppTreeContextProvider;
