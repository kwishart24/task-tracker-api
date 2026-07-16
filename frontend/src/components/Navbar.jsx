import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import RBNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Navbar({ user, logout }) {
  return (
    <RBNavbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container className="d-flex align-items-center">
        {/* Left */}
        <RBNavbar.Brand href="/">Task Tracker App</RBNavbar.Brand>

        {/* Center */}
        {user && (
          <>
            <span className="text-light flex-grow-1 d-flex justify-content-center align-items-center">
              Hello, {user.name}! What are we doing today?
            </span>

            {/* Right */}
            <Button onClick={logout} className="btn btn-primary ms-auto">
              Log Out
            </Button>
          </>
        )}
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
