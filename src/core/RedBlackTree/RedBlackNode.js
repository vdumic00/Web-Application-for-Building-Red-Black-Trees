const RedBlackNode = ({ data }) => {
  class RedBlackNode {
    constructor(data) {
      this.left = null;
      this.right = null;
      this.parent = null;
      this.data = data;
      this.color = "RED";
      this.direction = null;
      this.nodePath = "";
    }
  }

  const redBlackNode = new RedBlackNode(data);

  return redBlackNode;
};

export default RedBlackNode;
