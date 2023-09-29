import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error";
import ProfilePage from "./pages/profilePage";
import EditProfilePage from "./pages/editProfilePage";
import HomePage from "./pages/homePage";
import LandingPage from "./pages/landingPage";
import SignupPage from "./pages/signupPage";
import RootPage from "./pages/rootPage";
import LoginPage from "./pages/loginPage";
import MarketPage from "./pages/marketPage";
import { action as loginAction } from "./components/login";
import { action as signupAction } from "./components/signup";
import { loader as profileLoader } from "./components/profile";
import { createContext, useState } from "react";
import { action as profileEdit } from "./components/editProfile";
import { loader as homeLoader } from "./components/home";
import { loader as landingPageLoader } from "./components/landing";
import { loader as editpageLoader } from "./components/editProfile";
import ResetPasswordPage from "./pages/resetPasswordPage";
import { action as resetAction } from "./components/resetPassword";
import RecoveryPage from "./pages/recoveryPage";
import { action as recAction } from "./components/passwordRecovery";
import { loader as marketLoader } from "./components/market";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage />, loader: landingPageLoader },
      { path: "/signup", element: <SignupPage />, action: signupAction },
      { path: "/login", element: <LoginPage />, action: loginAction },
      { path: "/home", element: <HomePage />, loader: homeLoader },
      { path: "/market", element: <MarketPage />, loader: marketLoader },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: "/editprofile",
        element: <EditProfilePage />,
        action: profileEdit,
        loader: editpageLoader,
      },
      {
        path: "/resetpassword",
        element: <ResetPasswordPage />,
        action: resetAction,
      },
      {
        path: "/recoverypage",
        element: <RecoveryPage />,
        action: recAction,
      },
    ],
  },
]);
export const CurrentUserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </CurrentUserContext.Provider>
  );
}

export default App;
