import React, { useEffect, useRef } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./market.module.css";
import video1 from "../assests/videos/hunt.mp4";
import { Link } from "react-router-dom";

function Market() {
  const { userData, addsData } = useLoaderData();
  const mediaRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const videoElements = mediaRef.current;
    const url = "https://livecribauth.com/access";
    videoElements.forEach((videoElement, i) => {
      videoElement.addEventListener("ended", async function handleVideoEnd() {
        try {
          console.log("Video ended", videoElement.dataset);
          const accessInfo = {
            plan: videoElement.dataset.amount,
            user: userData.userNumber.trim(),
          };

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accessInfo),
          });
          const data = await response.json();
          console.log(data);
          if (data.message === "access created") {
            navigate("/home");
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
    return () => {
      if (videoElements.length > 0) {
        videoElements.forEach((videoElement, i) => {
          videoElement?.removeEventListener("ended", function handleVideoEnd() {
            console.log("Video ended");
          });
        });
      }
    };
  });
  return (
    <div className={classes.root}>
      <span className={classes.heading}>Market</span>
      <div className={classes.canvas}>
        {addsData.map((add, i) => {
          return (
            <div className={classes.frame} key={add._id}>
              <video
                className={classes.media}
                poster={add.posterURL}
                controls
                width="346px"
                height="159px"
                ref={(el) => (mediaRef.current[i] = el)}
                data-amount={add.accessPeriod}
              >
                <source src={video1} />
              </video>

              <div className={classes.link}>
                <label className={classes["add-link"]}>VISIT SITE</label>
                <Link to={add.addWebsiteURL} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M21 10.9746V21H1V1H10.5674"
                      stroke="#7A777E"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.71436 15.2857L21.0001 1H14.5808"
                      stroke="#7A777E"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 1V6.71429"
                      stroke="#7A777E"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div className={classes["ad-banner"]}>
                <span className={classes.circle}>Ad</span>
                <label className={classes.label}>
                  {`Watch add to get ${add.accessPeriod}`}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Market;

export async function loader() {
  const token = localStorage.getItem("token");
  const url = "https://livecribauth.com/profile";
  const url1 = "https://livecribauth.com/adds";

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
  const addResponse = await fetch(url1);

  const addsData = await addResponse.json();

  return { userData: userData, addsData: addsData };
}
