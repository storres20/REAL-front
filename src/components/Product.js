import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import {Link} from 'react-router-dom';
import {StyledImg} from '../styles/Product/StyledProduct';

import FileBase from 'react-file-base64';
import axios from "axios";

import noimage from '../noimage.png';
import '../loading.css'


const Product = props => {
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    model: "",
    quantity: "",
    warranty: "",
    price: "",
    published: false,
    image: ""
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  /* const [message, setMessage] = useState(""); */
  const [loading, setLoading] = useState(false) // loading

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
        setLoading(true) // loading
      })
      .catch(e => {
        console.log(e);
        setLoading(true) // loading
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };


  const updateProduct = () => {
    console.log(currentProduct);
    ProductDataService.update(currentProduct.id, currentProduct)
      .then(response => {
        console.log(response.data);
        /* setMessage("The Product was updated successfully!"); */
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  
  //FileBase64
  const [listingData, setListingData] = useState("")
  const [ansApi, setAnsApi] = useState("")
  const [isLoader, setIsLoader] = useState(false)

  let data64 //init variable

  //console.log(listingData)

  /* Put this Conditional for starting web app o refreshing
   * to avoid errors because initial value is ""
   * initial value:
   * listingData = "" and listingData.selectedFile = undefined
  */

  if (listingData !== "") {
    data64 = listingData.selectedFile.split(',')
    //console.log(data64); //data64 = image converted to base64
  }


  //Send image to ImgBB with AXIOS
  const handleClick = () => {
    //show loader hiden window
    setIsLoader(!isLoader)
  
    var data = new FormData();
    data.append('image', data64[1])
    //data.append('name', 'prueba01')

    //imgbb's personal Token
    //https://es.imgbb.com/
    let imgbbToken = '165bc83a2b0f87e5ddc8af943b7fcba4'
    let APIurl = 'https://api.imgbb.com/1/upload?key='

    var config = {
      method: 'post',
      url: APIurl + imgbbToken,
      headers: { "Content-Type": "multipart/form-data" },
      data: data
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        console.log(response);
        console.log(response.data.data.image.url);
        setIsLoader(isLoader)
        
        setCurrentProduct({ ...currentProduct, image: response.data.data.image.url });
        
        alert("File Fploaded Successfully")
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  //Input File
  //Convert image to base 64
  //set ansApi to false
  const handleListing = ({ base64 }) => {
    setListingData({ ...listingData, selectedFile: base64 })
    
    setAnsApi("")
  }
  
  //******************** */

  return (
    <div>
      {loading ? (
        <div className="d-flex flex-wrap">
          <StyledImg src={(currentProduct.image === null || currentProduct.image === "") ? (noimage) : (currentProduct.image)} alt={currentProduct.title} />
          
          <div className="edit-form">
            <h4>Edit Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentProduct.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  name="model"
                  value={currentProduct.model}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={currentProduct.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="warranty">Warranty</label>
                <input
                  type="text"
                  className="form-control"
                  id="warranty"
                  name="warranty"
                  value={currentProduct.warranty}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                />
              </div>
  
            </form>
            
            <FileBase type="file" multiple={false} onDone={({ base64 }) => handleListing({ base64 })} />
          
            {/* show selected image */}
            <img className={`img ${listingData ? "" : "hidden"} mt-2`} src={data64} alt="" style={{ width: 300 }} />
  
            <div className="mb-4 mt-2">
              {/* <h2>Send this image to "imgbb" storage for free</h2> */}
              <button disabled={listingData && !ansApi ? false : true}  className='btn btn-secondary' type='button' onClick={() => handleClick()}>Upload Image</button>
            </div>
  
  
            <button className="btn btn-danger mr-2" onClick={deleteProduct}>
              Delete
            </button>
  
            <button
              type="submit"
              className="btn btn-success mr-2"
              onClick={updateProduct}
            >
              Update
            </button>
            
            <Link
              to={"/products"}
              className="btn btn-danger"
            >
              Go Back
            </Link>
            
            {/* <p>{message}</p> */}
          </div>
        </div>
      ) : (
        <div className="flexLoad">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
    </div>
  );
};

export default Product;
