import { useContext } from "react";

import AppTreeContext from "../store/apptree-context";

const RedBlackTree = () => {
  const treeCtx = useContext(AppTreeContext);

  return (
    <div>
      {treeCtx.redBlackTree.root && (
        <div>
          {treeCtx.treeState.nodes}
          {treeCtx.treeState.paths}
        </div>
      )}
    </div>
  );
};

export default RedBlackTree;
