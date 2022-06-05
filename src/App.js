import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import ProductsCard from './components/ProductsCard';
import Card from "./components/Card";

import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={ProductsCard} />
          <Route exact path="/products" component={ProductsList} />
          <Route exact path="/add" component={AddProduct} />
          {/* <Route exact path="/card" component={ProductsCard} /> */}
          <Route path="/products/:id" component={Product} />
          <Route path="/card/:id" component={Card} />
          <Route exact path="*" component={ProductsCard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
