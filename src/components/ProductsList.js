import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

import noimage from '../noimage.png';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };


  const findByTitle = () => {
    ProductDataService.findByTitle(searchTitle)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
      <Link to={"/add"}><button className="btn btn-success mb-3">Add new</button></Link>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product's title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Products List</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.title}
              </li>
            ))}
        </ul>

        
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Product</h4>
            <img src={(currentProduct.image === null) ? (noimage) : (currentProduct.image) } alt={currentProduct.title} width={'200px'} />
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentProduct.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProduct.description}
            </div>
            <div>
              <label>
                <strong>Model:</strong>
              </label>{" "}
              {currentProduct.model}
            </div>
            <div>
              <label>
                <strong>Quantity:</strong>
              </label>{" "}
              {currentProduct.quantity}
            </div>
            <div>
              <label>
                <strong>Warranty:</strong>
              </label>{" "}
              {currentProduct.warranty}
            </div>
            <div>
              <label>
                <strong>Price: </strong>$
              </label>{" "}
              {currentProduct.price}
            </div>

            <Link
              to={"/products/" + currentProduct.id}
              className="btn btn-warning"
            >
              Edit
            </Link>
            
            <button className="btn btn-danger ml-2" onClick={deleteProduct}>
              Delete
            </button>
          
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
