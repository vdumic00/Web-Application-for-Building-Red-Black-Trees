import { useContext } from "react";

import AppTreeContext from "../store/apptree-context";
import RedBlackInput from "../components/RedBlackInput";
import RedBlackDelete from "../components/RedBlackDelete";
import RenderNodesAndPaths from "../core/DisplayTree/RenderNodesAndPaths";
import RedBlackTree from "../components/RedBlackTree";
import Restart from "../components/Restart";

import classes from "./RedBlackTreePage.module.css";

const RedBlackTreePage = () => {
  const treeCtx = useContext(AppTreeContext);

  const onAddNewNode = (value) => {
    treeCtx.insertRedBlackNode(value);
    RenderNodesAndPaths({ treeCtx: treeCtx });
  };

  const onDeleteNode = (value) => {
    treeCtx.removeRedBlackNode(value);
    RenderNodesAndPaths({ treeCtx: treeCtx });
  };

  const restartTree = () => {
    treeCtx.restartTree();
    RenderNodesAndPaths({ treeCtx: treeCtx });
  };

  return (
    <div>
      <div className={classes.container}>
        <h1>Unesite željene vrijednosti u stablo</h1>
        <RedBlackInput onInputValue={onAddNewNode} />
        <RedBlackDelete onDeleteValue={onDeleteNode} />
        <Restart onRestart={restartTree} />
      </div>
      <div className={classes.tree}>
        <RedBlackTree />
      </div>
    </div>
  );
};

export default RedBlackTreePage;
