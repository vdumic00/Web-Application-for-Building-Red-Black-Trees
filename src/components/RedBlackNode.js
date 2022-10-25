import { useEffect } from "react";
import { gsap } from "gsap";
import classes from "./RedBlackNode.module.css";

const RedBlackNode = (props) => {
  useEffect(() => {
    const element = props.node.container;
    const size = 22.5;
    const prevLeft = props.prevX - size;
    const prevTop = props.prevY - size;
    const left = props.x - size;
    const top = props.y - size;
    gsap.fromTo(
      element,
      { duration: 0.5, x: prevLeft, y: prevTop },
      { duration: 0.5, x: left, y: top }
    );
  }, [props]);

  const backgroundColor = {
    backgroundColor: props.color === "RED" ? "#ca3e3e" : "#3d3939",
  };

  return (
    <div
      className={classes.node}
      ref={(element) => (props.node.container = element)}
      style={backgroundColor}
    >
      <div className={classes.nodeDataContainer}>
        <div className={classes.nodeData}>{props.data}</div>
      </div>
    </div>
  );
};

export default RedBlackNode;
