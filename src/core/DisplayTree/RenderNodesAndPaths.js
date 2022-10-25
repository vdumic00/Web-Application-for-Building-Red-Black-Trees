import { RenderTree, GetNode, PathMap } from "../RedBlackTree/SupportFunctions";
import FindValueX from "./FindValueX";
import RedBlackNode from "../../components/RedBlackNode";
import RedBlackPath from "../../components/RedBlackPath";

const RenderNodesAndPaths = ({ treeCtx }) => {
  const tree = treeCtx.redBlackTree;
  let nodes = [];
  let prevNodes = {};

  const width = treeCtx.treeState.dimensions.width;

  const nodeMap = RenderTree({ tree: tree });

  let levels = Object.getOwnPropertyNames(nodeMap);
  let depth = levels.length;

  // Kreiranje čvorova
  for (let i = 0; i < depth; i++) {
    let level = levels[i];
    let nodesAtLevel = nodeMap[level];
    for (let j = 0; j < nodesAtLevel.length; j++) {
      let nodeId = nodesAtLevel[j];
      if (nodeId != null) {
        let nodeObj = GetNode({ tree: tree, nodeId: nodeId });
        let x = FindValueX({
          tree: tree,
          path: nodeObj.nodePath,
          treeWidth: width,
        });
        let y = level * 80;
        let prevX = 0;
        let prevY = 0;
        let prevNode = treeCtx.treeState.prevNodes[nodeId];
        if (typeof prevNode !== "undefined") {
          prevX = prevNode.x;
          prevY = prevNode.y;
        }

        const node = (
          <RedBlackNode
            node={nodeObj}
            id={nodeId}
            level={parseInt(level)}
            index={j}
            key={nodeId}
            data={nodeObj.data}
            x={x}
            y={y}
            prevX={prevX}
            prevY={prevY}
            color={nodeObj.color}
          />
        );
        nodes.push(node);
        prevNodes[nodeId] = { x: x, y: y };
      }
    }
  }

  let paths = [];
  let prevPaths = {};

  let pathMap = PathMap({ tree: tree });
  let pathIds = Object.getOwnPropertyNames(pathMap);

  // Stvaranje putanja
  for (let i = 0; i < pathIds.length; i++) {
    let path = pathMap[pathIds[i]];

    let fromNode = GetNode({ tree: tree, nodeId: path.from });
    let toNode = GetNode({ tree: tree, nodeId: path.to });
    let pathId = fromNode.id + toNode.id;
    let fromX = prevNodes[fromNode.id].x;
    let fromY = prevNodes[fromNode.id].y;
    let toX = prevNodes[toNode.id].x;
    let toY = prevNodes[toNode.id].y;
    let prevFromX = 0;
    let prevFromY = 0;
    let prevToX = 0;
    let prevToY = 0;

    let prevPath = treeCtx.treeState.prevPaths[pathId];

    if (typeof prevPath !== "undefined") {
      prevFromX = prevPath.fromX;
      prevFromY = prevPath.fromY;
      prevToX = prevPath.toX;
      prevToX = prevPath.toY;
    }

    path = (
      <RedBlackPath
        path={path}
        id={pathId}
        key={pathId}
        fromX={fromX}
        fromY={fromY}
        toX={toX}
        toY={toY}
        prevFromX={prevFromX}
        prevFromY={prevFromY}
        prevToX={prevToX}
        prevToY={prevToY}
      />
    );

    paths.push(path);
    prevPaths[pathId] = { fromX: fromX, fromY: fromY, toX: toX, toY: toY };
  }

  treeCtx.updateNodesPaths(nodes, prevNodes, paths, prevPaths);
};

export default RenderNodesAndPaths;
