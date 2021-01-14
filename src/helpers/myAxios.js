import axios from "axios";
//new axios instance to input base url so we dont have to change it over multiple files
const myAxios = axios.create({
  baseURL: "http://52.91.206.252:4060",
});

export default myAxios;
