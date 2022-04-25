import React, { useState } from "react";
import ProductDataService from "../services/ProductService";
import {Link} from 'react-router-dom';

import FileBase from 'react-file-base64';
import axios from "axios";


const AddProduct = () => {

  const initialProductState = {
    id: null,
    title: "",
    description: "",
    model: "",
    quantity: "",
    warranty: "",
    price: "",
    image: "",
    published: false
  };
  
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
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
        setAnsApi(response.data.data.image.url)
        setIsLoader(isLoader)
        setProduct({ ...product, image: response.data.data.image.url });
        
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


  const saveProduct = () => {
  
    if (product.title && product.description && product.model && product.quantity && product.warranty && product.price) {
    
    var data = {
      title: product.title,
      description: product.description,
      model: product.model,
      quantity: product.quantity,
      warranty: product.warranty,
      price: product.price,
      image: ansApi,
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
          image: response.data.image,
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
          
          <FileBase type="file" multiple={false} onDone={({ base64 }) => handleListing({ base64 })} />
          
          {/* show selected image */}
          <img className={`img ${listingData ? "" : "hidden"} mt-2`} src={data64} alt="" style={{ width: 300 }} />

          <div className="mb-4 mt-2">
            {/* <h2>Send this image to "imgbb" storage for free</h2> */}
            <button disabled={listingData && !ansApi ? false : true}  className='btn btn-secondary' type='button' onClick={() => handleClick()}>Upload Image</button>
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
