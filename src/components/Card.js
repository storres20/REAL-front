import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from 'react-router-dom';

import {StyledCont} from '../styles/Card/StyledCont';
import {StyledImg} from '../styles/Card/StyledImg';
import {StyledDiv} from '../styles/Card/StyledDiv';
import {StyledP} from '../styles/Card/StyledP';


import noimage from '../noimage.png';


const Product = props => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
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
