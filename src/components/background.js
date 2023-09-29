import React from "react";
import classes from "./background.module.css";

function Background(props) {
  return <div className={classes.root}>{props.children}</div>;
}

export default Background;
