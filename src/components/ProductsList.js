import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

import noimage from '../noimage.png';
import '../loading.css'

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(false) // loading

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
        setLoading(true) // loading
      })
      .catch(e => {
        console.log(e);
        setLoading(true) // loading
      });
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
  
  
  const deleteProduct2 = (id) => {
  
    if (window.confirm("Do you want to DELETE ?") === true) {
      ProductDataService.remove(id)
      .then(response => {
        console.log(response.data);
        window.location.reload(true);
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  };

  return (
    <div className="">
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
      
      {loading ? (
      
        <table className="table table-hover table-striped table-responsive text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Model</th>
              <th scope="col">Quantity</th>
              <th scope="col">Warranty</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {products &&
              products.map((product, index) => (
                <tr key={index}>
                  <th scope="row" className="align-middle">{index+1}</th>
                  <td className="align-middle">{product.title}</td>
                  <td className="align-middle">{product.description}</td>
                  <td className="align-middle">{product.model}</td>
                  <td className="align-middle">{product.quantity}</td>
                  <td className="align-middle">{product.warranty}</td>
                  <td className="align-middle">{product.price}</td>
                  <td><img src={(product.image === null || product.image === "") ? (noimage) : (product.image) } alt={product.title} width={100} /></td>
                  <td className="align-middle">
                    <Link
                      to={`products/${product.id}`}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button className="btn btn-danger ml-2" onClick={() => deleteProduct2(`${product.id}`)}>
                      Delete
                    </button>
                  </td>
                  
                </tr>
              ))}
            
          </tbody>
        </table>
      
      ) : (
      
        <div className="flexLoad">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      
      )}
      
      
      
      
    </div>
  );
};

export default ProductsList;
