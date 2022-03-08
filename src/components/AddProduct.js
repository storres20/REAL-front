import React, { useState } from "react";
import ProductDataService from "../services/ProductService";
import {Link} from 'react-router-dom';


const AddProduct = () => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      title: product.title,
      description: product.description
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
              required
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
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
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
