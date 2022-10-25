const Barrier = ({ tree, low, high, path }) => {
  const half = (high + low) / 2.0;
  if (path === "") {
    return half;
  } else if (path[0] === "L") {
    return Barrier({
      tree: tree,
      low: low,
      high: half,
      path: path.slice(1),
    });
  } else {
    return Barrier({
      tree: tree,
      low: half,
      high: high,
      path: path.slice(1),
    });
  }
};

const FindValueX = ({ tree, path, treeWidth }) => {
  const x = Barrier({
    tree: tree,
    low: 0,
    high: treeWidth,
    path: path,
  });
  return x;
};

export default FindValueX;
