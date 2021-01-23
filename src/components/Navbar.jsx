import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import whiteLogo from "../assets/tron-white-vector.svg";


export default function AppNavbar({onToggleDeposit, onToggleStat}) {
  return (
    <Navbar className="py-2 navbar-dark bg-primary fixed-top shadow-lg">
      <Nav className="w-100 justify-content-around">
        <NavItem className="h5">
          <NavLink active href="#about">About Us</NavLink>
        </NavItem>
        <NavItem className="h5 mr-3">
          <NavLink active href="#investment">Investment</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <img src={whiteLogo} alt="Tron crypto logo" height="60" className="fixed-top mx-auto" />
          </NavLink>
        </NavItem>
        <NavItem className="h5 ml-3">
          <NavLink active onClick={onToggleDeposit}>Make Deposit</NavLink>
        </NavItem>
        <NavItem className="h5">
          <NavLink active onClick={onToggleStat}>Wallet Statistics</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
