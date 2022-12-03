import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

import { StyledUl, StyledLi, StyledImg } from '../styles/ProductsCard/StyledProductsCard';
import '../loading.css'


import noimage from '../noimage.png';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
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


  const setActiveProduct = (product, index) => {
    setCurrentIndex(index);
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
    <div>
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
      <h4 className="text-center">Products List</h4>
      
      {noData ? (
        <h3 className="text-center mt-5">No Data to Show...</h3>
      ) : ("")}
      
      {loading ? (
      
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
                      src={(product.image === null || product.image === "") ? (noimage) : (product.image) }
                      alt={product.title}
                    />
                  </Link>
                  <div>{product.title}</div>
                </StyledLi>
    
    
              ))}
          </StyledUl>
    
        </div>
      
      ) : (
      
        <div className="flexLoad">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      
      )}
            
      
      
    </div>
  );
};

export default ProductsList;
