import { useEffect } from "react";

import { Line } from "react-lineto";
import { gsap } from "gsap";

import classes from "./RedBlackPath.module.css";

const RedBlackPath = (props) => {
  useEffect(() => {
    const element = props.path.container;

    gsap.fromTo(
      element,
      {
        duration: 0.5,
        x0: props.prevFromX,
        y0: props.prevFromY,
        x1: props.prevToX,
        y1: props.prevToY,
      },
      {
        duration: 0.5,
        x0: props.fromX,
        y0: props.fromY,
        x1: props.toX,
        y1: props.toY,
      }
    );
  }, [props]);

  const paddingX = 400;
  const paddingY = 410;

  return (
    <Line
      x0={props.fromX + paddingX}
      y0={props.fromY + paddingY}
      x1={props.toX + paddingX}
      y1={props.toY + paddingY}
      borderColor={"black"}
      borderWidth={2}
      ref={(element) => (props.path.container = element)}
      className={classes.path}
    />
  );
};

export default RedBlackPath;
