import React, { useState } from "react";
import ProductDataService from "../services/ProductService";
import {Link} from 'react-router-dom';


const AddProduct = () => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    model: "",
    quantity: "",
    warranty: "",
    price: "",
    published: false
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
  
    if (product.title && product.description && product.model && product.quantity && product.warranty && product.price) {
    
    var data = {
      title: product.title,
      description: product.description,
      model: product.model,
      quantity: product.quantity,
      warranty: product.warranty,
      price: product.price,
      published: product.published,
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          model: response.data.model,
          quantity: response.data.quantity,
          warranty: response.data.warranty,
          price: response.data.price,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
    }else {
      alert("Faltan Datos")
    }
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success mr-3" onClick={newProduct}>
            Add
          </button>
          <Link
            to={"/products"}
            className="btn btn-danger"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required={true}
              value={product.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required={true}
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              required={true}
              value={product.model}
              onChange={handleInputChange}
              name="model"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              required={true}
              value={product.quantity}
              onChange={handleInputChange}
              name="quantity"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="warranty">Warranty</label>
            <input
              type="text"
              className="form-control"
              id="warranty"
              required={true}
              value={product.warranty}
              onChange={handleInputChange}
              name="warranty"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required={true}
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success mr-3">
            Submit
          </button>
          <Link
            to={"/products"}
            className="btn btn-danger"
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
