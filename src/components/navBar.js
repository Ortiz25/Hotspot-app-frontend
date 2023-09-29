import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./navBar.module.css";

function TextLinkExample() {
  return (
    <>
      <Navbar
        data-bs-theme="dark"
        className={`bg-body-tertiary` + classes.cont}
      >
        <Container>
          <Navbar.Brand href="#home">
            <i class="fa-solid fa-wifi"></i>
            LiveCrib
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className={classes.internetbtn}>
              <i class="fa-solid fa-wifi"></i>
              No internet
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h2>Good Morning!</h2>
        <h1>Samuel Deya</h1>
      </Container>
      <Container>
        <div className={classes.balance}># 46MB Balance</div>
      </Container>
    </>
  );
}

export default TextLinkExample;
