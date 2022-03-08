import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

import logo from './logo.png';
import {StyledNav} from './styles/Header/StyledNav';
import {StyledLink} from './styles/Header/StyledLink';
import {StyledLogo} from './styles/Header/StyledLogo';


function App() {
  return (
    <div>
      <StyledNav className="navbar navbar-expand navbar-dark ">
        <Link to={"/products"}>
          <StyledLogo src={logo} alt="logo" width={'60px'} />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <StyledLink to={"/products"}>
              Products
            </StyledLink>
          </li>
          <li className="nav-item">
            <StyledLink to={"/add"}>
              Add
            </StyledLink>
          </li>
        </div>
      </StyledNav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductsList} />
          <Route exact path="/add" component={AddProduct} />
          <Route path="/products/:id" component={Product} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
