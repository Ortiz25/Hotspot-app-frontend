import { redirect } from "react-router-dom";

export function loadToken() {
  const token = localStorage.getItem("token");

  return token;
}

export function tokenRedirect() {
  const token = localStorage.getItem("token");
  const signup = "/signup";

  if (token) {
    return redirect("/home");
  } else {
    return signup;
  }
}
