import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";

export default function AppNavbar({onToggle}) {
  return (
    <Navbar className="py-2 navbar-dark bg-primary fixed-top shadow-lg">
      <Nav className="w-100 justify-content-around">
        <NavItem className="h5">
          <NavLink>About Us</NavLink>
        </NavItem>
        <NavItem className="h5 mr-5">
          <NavLink>Investment</NavLink>
        </NavItem>
        <NavItem className="h5 ml-5">
          <NavLink onClick={onToggle}>Make Deposit</NavLink>
        </NavItem>
        <NavItem className="h5">
          <NavLink onClick={onToggle}>Wallet Statistics</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
