import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import classes from "./home.module.css";
import { redirect } from "react-router-dom";
import video1 from "../assests/videos/hunt.mp4";
import { useSelector } from "react-redux";

function Home() {
  const { userData, addsData } = useLoaderData();
  const [isOnline, setOnline] = useState(false);
  const [dataBalance, setDataBalance] = useState(0);
  const videoRef = useRef([]);
  const navigate = useNavigate();
  const submit = useSubmit();
  const mac = useSelector((state) => state.mac);
  const ip = useSelector((state) => state.ip);
  const linkLoginOnly = useSelector((state) => state.linkLoginOnly);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://vast-cyan-seahorse-wig.cyclic.app/balance";
        const user = { userName: userData.userNumber };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log(data);
        if (data.message === "limit does not exist") {
          return;
        }

        const balance = data.bundleBalance / 1000000;
        setDataBalance(balance.toFixed(0));
      } catch (err) {
        console.log(err);
        return setDataBalance(0);
      }
    }
    fetchData();
  }, [userData.userNumber]);

  useEffect(() => {
    async function fetchData() {
      try {
        const urlStatus = "https://jsonplaceholder.typicode.com/todos/1";
        const responseStatus = await fetch(urlStatus);
        if (responseStatus.status === 200) {
          return setOnline(true);
        } else {
          return setOnline(false);
        }
      } catch (err) {
        return setOnline(false);
      }
    }
    fetchData();
  }, [isOnline]);

  useEffect(() => {
    const videoElements = videoRef.current;
    const url = "https://vast-cyan-seahorse-wig.cyclic.app/access";
    // Add event listeners when the component mounts
    videoElements.forEach((videoElement, i) => {
      videoElement.addEventListener("ended", async function handleVideoEnd() {
        try {
          console.log("Video ended", videoElement.dataset);
          const accessInfo = {
            plan: videoElement.dataset.amount,
            user: userData.userNumber.trim(),
            mac: mac,
            linkLoginOnly: linkLoginOnly,
          };
          console.log(ip, mac, linkLoginOnly);

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
            console.log("true");
            navigate("/market");
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
      <span className={classes["wifi-icon"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="19"
          viewBox="0 0 75 65"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M37.5021 13.4992C48.3839 13.4998 58.8497 18.5468 66.7362 27.5971C67.3301 28.2958 68.2793 28.287 68.8642 27.5774L74.5411 20.6618C74.8373 20.3018 75.0024 19.8143 75 19.307C74.9975 18.7997 74.8277 18.3145 74.5281 17.9588C53.8284 -5.98625 21.1724 -5.98625 0.472778 17.9588C0.172929 18.3142 0.00279917 18.7993 3.42323e-05 19.3066C-0.00273071 19.8139 0.162098 20.3016 0.458045 20.6618L6.1366 27.5774C6.72113 28.2881 7.67111 28.2969 8.26462 27.5971C16.1522 18.5462 26.6191 13.4992 37.5021 13.4992ZM37.5015 35.9982C43.4804 35.9977 49.2459 38.6802 53.6778 43.5243C54.2772 44.2118 55.2215 44.1969 55.8058 43.4907L61.4762 36.5751C61.7748 36.2124 61.9405 35.7203 61.9362 35.2089C61.9319 34.6976 61.7579 34.2097 61.4533 33.8543C47.9573 18.701 27.0572 18.701 13.5612 33.8543C13.2564 34.2097 13.0825 34.6978 13.0785 35.2093C13.0745 35.7209 13.2407 36.2129 13.54 36.5751L19.2087 43.4907C19.793 44.1969 20.7373 44.2118 21.3367 43.5243C25.7657 38.6834 31.5266 36.0012 37.5015 35.9982ZM48.8614 51.1368C48.8701 51.6495 48.7031 52.1439 48.3998 52.5032L38.5913 64.4513C38.3037 64.8025 37.9117 65.0001 37.5027 65.0001C37.0937 65.0001 36.7017 64.8025 36.4141 64.4513L26.6039 52.5032C26.3009 52.1437 26.1342 51.6491 26.1431 51.1363C26.1521 50.6235 26.336 50.138 26.6514 49.7942C32.9155 43.399 42.0899 43.399 48.354 49.7942C48.6691 50.1382 48.8527 50.624 48.8614 51.1368Z"
            fill="white"
          />
        </svg>
      </span>
      <span className={classes.heading}>LiveCrib</span>
      <span
        className={classes["status-bar"]}
        style={{ backgroundColor: isOnline ? "green" : "red" }}
      >
        {isOnline ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="16"
            viewBox="0 0 75 65"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.5021 13.4992C48.3839 13.4998 58.8497 18.5468 66.7362 27.5971C67.3301 28.2958 68.2793 28.287 68.8642 27.5774L74.5411 20.6618C74.8373 20.3018 75.0024 19.8143 75 19.307C74.9975 18.7997 74.8277 18.3145 74.5281 17.9588C53.8284 -5.98625 21.1724 -5.98625 0.472778 17.9588C0.172929 18.3142 0.00279917 18.7993 3.42323e-05 19.3066C-0.00273071 19.8139 0.162098 20.3016 0.458045 20.6618L6.1366 27.5774C6.72113 28.2881 7.67111 28.2969 8.26462 27.5971C16.1522 18.5462 26.6191 13.4992 37.5021 13.4992ZM37.5015 35.9982C43.4804 35.9977 49.2459 38.6802 53.6778 43.5243C54.2772 44.2118 55.2215 44.1969 55.8058 43.4907L61.4762 36.5751C61.7748 36.2124 61.9405 35.7203 61.9362 35.2089C61.9319 34.6976 61.7579 34.2097 61.4533 33.8543C47.9573 18.701 27.0572 18.701 13.5612 33.8543C13.2564 34.2097 13.0825 34.6978 13.0785 35.2093C13.0745 35.7209 13.2407 36.2129 13.54 36.5751L19.2087 43.4907C19.793 44.1969 20.7373 44.2118 21.3367 43.5243C25.7657 38.6834 31.5266 36.0012 37.5015 35.9982ZM48.8614 51.1368C48.8701 51.6495 48.7031 52.1439 48.3998 52.5032L38.5913 64.4513C38.3037 64.8025 37.9117 65.0001 37.5027 65.0001C37.0937 65.0001 36.7017 64.8025 36.4141 64.4513L26.6039 52.5032C26.3009 52.1437 26.1342 51.6491 26.1431 51.1363C26.1521 50.6235 26.336 50.138 26.6514 49.7942C32.9155 43.399 42.0899 43.399 48.354 49.7942C48.6691 50.1382 48.8527 50.624 48.8614 51.1368Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="14"
            viewBox="0 0 75 65"
            fill="none"
          >
            <path
              d="M1.28034 0.219681C0.987451 -0.0732187 0.512571 -0.0732288 0.219681 0.219661C-0.0732187 0.512551 -0.0732288 0.987431 0.219661 1.28032L3.58402 4.64475C2.8631 5.10444 2.18071 5.64908 1.5511 6.27869C1.06185 6.76794 0.587431 7.34804 0.157271 7.9681C-0.0788289 8.3084 0.00567114 8.7757 0.346001 9.0118C0.686341 9.2479 1.15363 9.1634 1.38974 8.8231C1.77147 8.2728 2.18989 7.76122 2.61177 7.33935C3.24464 6.70647 3.93852 6.17176 4.67447 5.73522L6.26593 7.32671C5.57451 7.69363 4.92526 8.1682 4.34294 8.7506C3.73234 9.3612 3.2343 10.0505 2.8515 10.8073C2.66454 11.1769 2.81261 11.6281 3.18224 11.8151C3.55186 12.0021 4.00305 11.854 4.19001 11.4844C4.50137 10.8688 4.90578 10.3091 5.4036 9.8112C5.9936 9.2212 6.668 8.7671 7.38794 8.4487L9.3185 10.3794C8.2659 10.5297 7.25126 11.0097 6.44151 11.8194C5.9946 12.2663 5.63821 12.8009 5.38076 13.3893C5.21472 13.7688 5.38774 14.211 5.76722 14.3771C6.14669 14.5431 6.58892 14.3701 6.75497 13.9906C6.93955 13.5688 7.19165 13.1906 7.50217 12.8801C8.4134 11.9689 9.6924 11.6496 10.8613 11.9222L18.7194 19.7805C19.0123 20.0734 19.4872 20.0734 19.7801 19.7805C20.073 19.4876 20.073 19.0127 19.7801 18.7198L1.28034 0.219681ZM9.5842 6.40227L11.1676 7.98565C12.4554 8.2084 13.6894 8.8169 14.6838 9.8112C15.1603 10.2878 15.5806 10.8766 15.9009 11.5029C16.0896 11.8717 16.5414 12.0177 16.9102 11.8291C17.279 11.6405 17.425 11.1887 17.2364 10.8199C16.8467 10.058 16.3352 9.3414 15.7445 8.7506C14.0533 7.05945 11.7978 6.27668 9.5842 6.40227ZM6.48684 3.30481L7.71316 4.53115C11.0869 3.77801 14.7617 4.71408 17.3869 7.33935C17.8303 7.78274 18.2532 8.2944 18.6212 8.8276C18.8565 9.1685 19.3236 9.2541 19.6645 9.0188C20.0054 8.7836 20.091 8.3165 19.8557 7.97557C19.4373 7.36931 18.9567 6.78773 18.4476 6.27869C15.2106 3.04172 10.5784 2.05043 6.48684 3.30481ZM11.0601 14.4391C11.646 15.0249 11.646 15.9748 11.0601 16.5607C10.4743 17.1465 9.5244 17.1465 8.9386 16.5607C8.3527 15.9748 8.3527 15.0249 8.9386 14.4391C9.5244 13.8532 10.4743 13.8532 11.0601 14.4391Z"
              fill="white"
            />
          </svg>
        )}
        {isOnline ? "internet" : "No internet"}
      </span>

      <span className={classes["time-of-day"]}>{userData.greet}</span>
      <span className={classes.user}>{userData.name}</span>

      <div className={classes["bundle-balance"]}>{`${dataBalance}MB used`}</div>
      <div className={classes["active-box"]}>
        {addsData.map((add, i) => {
          return (
            <div className={classes.frame} key={add._id}>
              <video
                className={classes.media}
                poster={add.posterURL}
                controls
                width="346px"
                height="159px"
                ref={(el) => (videoRef.current[i] = el)}
                data-amount={add.accessPeriod}
              >
                <source src={video1} />
              </video>

              <div className={classes.link}>
                <label className={classes["add-link"]}>VISIT SITE</label>
                <a href={add.addWebsiteURL} target="_blank" rel="noreferrer">
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
                </a>
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

export default Home;

export async function loader() {
  const token = localStorage.getItem("token");
  const url = "https://vast-cyan-seahorse-wig.cyclic.app/profile";
  const url1 = "https://vast-cyan-seahorse-wig.cyclic.app//adds";

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
