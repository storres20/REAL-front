import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://apicrudreal.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});
