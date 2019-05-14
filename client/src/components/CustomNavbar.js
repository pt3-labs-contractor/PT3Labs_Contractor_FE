import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import './CustomNavbar.css'


const CustomNavbar = () => {
  const [state, setState] = useState({
    isOpen: false
  })
 
  const toggle = () => {
    setState({
      isOpen: !this.state.isOpen
    });
  }
 
    return (
      <div>
        <Navbar color="secondary" light expand="md">
          <NavbarBrand href="/" className="team-name">Team Gents</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/billing">Billing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/feedback">Feedback</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/scheduling">Scheduling</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Sign In
                  </DropdownItem>
                  <DropdownItem>
                    Sign Up
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default CustomNavbar