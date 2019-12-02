import React, {useContext} from 'react'
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom'
import Planer from '../planer/Planer';
import Balancer from '../balancer/Balancer';
import LoginContainer from '../user/LoginContainer';
import UserCreate from "../admin/UserCreate"
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import PrivateRoute from "../auth/PrivateRoute";
import ResetPassword from "../user/ResetPassword";
import Logout from "../user/Logout";
import {AuthContext} from "../auth/Auth";
import SupplierContact from "../planer/SupplierContact";
import StartPage from "./startpage";
import EmailResp from "../email/emailResponse";
import EmailNoAccess from "../email/emailNOAccess";


const NavItems = () => {
    const {state} = useContext(AuthContext);
    if (state.user === null) {
        return null
    }
    else if (state.user.role === "Admin") {
        return (
            <Nav className="mr-auto">
                <Nav.Link><Link to="/planer">Planer</Link></Nav.Link>
                <Nav.Link><Link to="/balancer">Balancer</Link></Nav.Link>
                <Nav.Link><Link to="/contacts">Contact Template</Link></Nav.Link>
            </Nav>
        );
    } else if (state.user.role === "Planer") {
        return (
            <Nav className="mr-auto">
                <Nav.Link><Link to="/planer">Planer</Link></Nav.Link>
                <Nav.Link><Link to="/contacts">Contact Template</Link></Nav.Link>
            </Nav>
        );
    } else {
        return (
            <Nav className="mr-auto">
                <Nav.Link><Link to="/balancer">Balancer</Link></Nav.Link>
            </Nav>
        );
    }
};

const UserOptions = () => {
    const {state} = useContext(AuthContext);
    if (state.user === null) {
        return null
    }
    else if (state.user.role === "Admin") {
        return (
            <Nav style={{paddingRight: '100px'}}>
                <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item><
                        Link to="/reset-password">Reset Password</Link></NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to="/create-account">Create new User</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>
                        <Link to="/logout">Logout</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    } else {
        return (
            <Nav style={{paddingRight: '100px'}}>
                <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>
                        <Link to="/logout">Logout</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }
};


const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavItems/>
                    <UserOptions/>
                </Navbar.Collapse>
            </Navbar>
            <div className="App-intro">
                <Switch>
                    <PrivateRoute exact path="/" component={StartPage}/>
                    <PrivateRoute path="/planer" component={Planer}/>
                    <PrivateRoute path="/balancer" component={Balancer}/>
                    <PrivateRoute path="/reset-password" component={ResetPassword}/>
                    <PrivateRoute path="/create-account" component={UserCreate}/>
                    <Route path="/contacts" component={SupplierContact}/>
                    <PrivateRoute exact path="/logout" component={Logout}/>
                    <Route path="/email/:cid/:tid/:pid" component={EmailResp}/>
                    <Route path="/emailNoAccess" component={EmailNoAccess}/>
                    <Route exact path="/login" component={LoginContainer}/>
                </Switch>
            </div>
        </BrowserRouter>)
};

export default Routes;