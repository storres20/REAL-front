import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

import noimage from '../noimage.png';
import '../loading.css'

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false) // loading
  const [noData, setNoData] = useState(false) // no data

  useEffect(() => {
    retrieveProducts();
  }, []);


  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        setAllData(response.data)
        console.log(response.data);
        setLoading(true) // loading
      })
      .catch(e => {
        console.log(e);
        setLoading(true) // loading
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
  
  
  const handleSearch = (event) => {
    const keyword = event.target.value;

    if (keyword !== '') {
      const results = allData.filter((user) => {
        //return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        return user.title.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });

      setProducts(results);
      
      // NoData
      if (results.length === 0) {
        setNoData(true)
      }
      else setNoData(false)

    } else {
      setProducts(allData);
      // If the text field is empty, show all users
    }

  }

  return (
    <div className="">
      <Link to={"/add"}><button className="btn btn-success mb-3">Add new</button></Link>
      <div className="col-md-8">
        <label className="form-label">Search bar:</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product's title"
            onChange={event => handleSearch(event)}
          />
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
      
      {noData ? (
        <h1 className="text-center mt-5">No Data to Show...</h1>
      ) : ("")}
      
      
    </div>
  );
};

export default ProductsList;
