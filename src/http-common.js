import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080/api", //localhost
  //baseURL: "http://localhost:6868/api", //docker
  //baseURL: "https://apicrudreal.herokuapp.com/api",
  baseURL: "https://real-back.vercel.app/api",
  
  headers: {
    "Content-type": "application/json"
  }
});
