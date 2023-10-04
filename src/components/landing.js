import React from "react";
import classes from "./landing.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mikrotikActions } from "../components/store/mikroInfo";

function Landing() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mac = queryParams.get("mac");
  const ip = queryParams.get("ip");
  const username = queryParams.get("username");
  const linkLoginOnly = queryParams.get("link-login-only");
  console.log(mac, linkLoginOnly);

  function handleMikrotikData() {
    dispatch(
      mikrotikActions.updateMikroInfo({
        mac: mac,
        ip: ip,
        username: username,
        linkLoginOnly: linkLoginOnly,
      })
    );
  }
  handleMikrotikData();

  return (
    <div className={classes.root}>
      <span className={classes.wifiicon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="65"
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
      <span className={classes.welcometxt}>
        <h3>Work and Play with fast internet</h3>
      </span>
      <Link to="/login" className={classes.btn}>
        Get Started
      </Link>
    </div>
  );
}
export default Landing;

export async function loader() {
  return null;
}
