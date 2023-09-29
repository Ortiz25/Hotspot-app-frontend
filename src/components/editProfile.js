import React from "react";
import classes from "./editProfile.module.css";
import { Form, redirect } from "react-router-dom";
import { loadToken } from "../util/auth";

function EditProfile() {
  return (
    <div className={classes.root}>
      <label className={classes.heading}>Edit Profile</label>
      <Form method="post" className={classes.canvas}>
        <label htmlFor="name" className={classes.name}>
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="name"
          className={classes.name1}
        />
        <label htmlFor="date" className={classes["phone-number"]}>
          DOB
        </label>
        <input type="date" name="date" id="date" className={classes.number} />
        <label htmlFor="email" className={classes.email}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={classes.email1}
        />
        <label htmlFor="gender" className={classes.gender}>
          Gender
        </label>

        <select id="gender" name="gender" className={classes.gender1}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" className={classes["btn-edit"]}>
          Update
        </button>
      </Form>
    </div>
  );
}

export default EditProfile;

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

export async function action({ request, params }) {
  const data = await request.formData();
  const updateData = {
    fullName: data.get("fullName"),
    gender: data.get("gender"),
    dob: data.get("date"),
    email: data.get("email"),
    token: loadToken(),
  };
  // console.log(updateData);
  let url = "https://vast-cyan-seahorse-wig.cyclic.app/editprofile";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const dataResponse = await response.json();
  if (dataResponse.message === "profile updated") {
    return redirect("/profile");
  }
}
