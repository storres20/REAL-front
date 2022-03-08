import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";
import { StyledUl } from '../styles/ProductsCard/StyledUl';
import { StyledLi } from '../styles/ProductsCard/StyledLi';
import { StyledImg } from '../styles/ProductsCard/StyledImg';


import noimage from '../noimage.png';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      <div className="col-md-8">
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
      <h4 className="text-center">Products List</h4>
      <div>
        <StyledUl>
          {products &&
            products.map((product, index) => (
              <StyledLi
                className={
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                <Link to={"/card/" + product.id}>
                  <StyledImg
                    width={200}
                    src={(product.image === null) ? (noimage) : (product.image)}
                    alt={product.title}
                  />
                </Link>
                <div>{product.title}</div>
              </StyledLi>


            ))}
        </StyledUl>

      </div>
      
    </div>
  );
};

export default ProductsList;
