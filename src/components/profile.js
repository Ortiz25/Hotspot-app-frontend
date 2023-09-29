import React from "react";
import classes from "./profile.module.css";
import { Link, useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";

function Profile() {
  const data = useLoaderData();
  return (
    <div className={classes.root}>
      <span className={classes.heading}>Profile</span>
      <div className={classes.canvas}>
        <span className={classes["canvas-info"]}>
          <label className={classes.label1}>Full Name</label>
          <span className={classes.name1}>{data.name ? data.name : ""}</span>
          <hr className={classes.hr1} />
          <label className={classes.label2}>Phone Number</label>
          <span className={classes.phone}>
            {data.userNumber ? data.userNumber : ""}
          </span>
          <hr className={classes.hr2} />
          <label className={classes.label3}>Email</label>
          <span className={classes.email}>{data.email ? data.email : ""}</span>
          <hr className={classes.hr3} />
          <label className={classes.label4}>Gender</label>
          <span className={classes.gender}>
            {data.gender ? data.gender : ""}
          </span>
          <hr className={classes.hr4} />
          <label className={classes.label5}>DOB</label>
          <span className={classes.date}>
            {data.dob ? data.dob.slice(0, 10) : ""}
          </span>
        </span>
        <Link to="/editprofile" className={classes["btn-edit"]}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;

export async function loader() {
  const token = localStorage.getItem("token");
  const url = "https://vast-cyan-seahorse-wig.cyclic.app/profile";
  const data = { token: token };

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const userData = await response.json();
  if (userData.message === "token expired") {
    return redirect("/login");
  }

  return userData;
}
