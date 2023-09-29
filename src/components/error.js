import React from "react";
import classes from "./error.module.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.error}>Error: Reload</div>
        <Link to="/home">
          <div className={classes.back}>
            <i className="fa-solid fa-rotate-left"></i>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Error;
