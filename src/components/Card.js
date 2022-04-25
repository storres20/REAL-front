import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from 'react-router-dom';

import {StyledCont, StyledImg, StyledDiv, StyledP} from '../styles/Card/StyledCard';


import noimage from '../noimage.png';


const Product = props => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    model: "",
    quantity: "",
    prince: "",
    published: false
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);


  return (
    <div>

      <StyledCont>
        <StyledImg src={(currentProduct.image === null) ? (noimage) : (currentProduct.image)} alt={currentProduct.title} />
        <StyledDiv>
          <StyledP><strong>Title:</strong> {currentProduct.title}</StyledP>
          <p><strong>Description:</strong> {currentProduct.description}</p>
          <p><strong>Model:</strong> {currentProduct.model}</p>
          <p><strong>Quantity:</strong> {currentProduct.quantity}</p>
          <p><strong>Warranty:</strong> {currentProduct.warranty}</p>
          <p><strong>Price: </strong>$ {currentProduct.price}</p>
          <Link
            to={"/"}
            className="btn btn-danger"
          >
            Go Back
          </Link>
        </StyledDiv>
      </StyledCont>

    </div>
  );
};

export default Product;
