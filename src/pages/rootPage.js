import { Outlet } from "react-router-dom";
import Background from "../components/background";

function RootPage() {
  return (
    <>
      <Background>
        <Outlet />
      </Background>
    </>
  );
}

export default RootPage;
