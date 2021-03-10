import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import whiteLogo from "../assets/tron-white-logo.svg";


export default function AppNavbar({onToggleDeposit, onToggleStat, onToggleInvest}) {
  return (
    <Navbar className="py-2 navbar-dark bg-primary fixed-top shadow-lg" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {/* visible only on small screen */}
      <Navbar.Brand href="#home" className="flex-fill text-center d-block d-md-none ml-auto">
        <img src={whiteLogo} alt="Tron crypto logo" height="60" className="mx-auto" />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-around">
            <NavItem className="h5 flex-fill d-flex">
              <NavLink href="#about" className="my-auto mx-auto">About Us</NavLink>
            </NavItem>
            <NavItem className="h5 flex-fill d-flex">
              <NavLink href="#investment" className="my-auto mx-auto" onClick={onToggleInvest}>Investment</NavLink>
            </NavItem>
            <NavItem className="flex-fill text-center d-none d-md-block">
              <NavLink className="p-0">
                <img src={whiteLogo} alt="Tron crypto logo" height="75" className="mx-auto" />
              </NavLink>
            </NavItem>
            <NavItem className="h5 flex-fill d-flex">
              <NavLink onClick={onToggleDeposit} className="my-auto mx-auto">Make Deposit</NavLink>
            </NavItem>
            <NavItem className="h5 flex-fill d-flex">
              <NavLink onClick={onToggleStat} className="my-auto mx-auto">Wallet Statistics</NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}
