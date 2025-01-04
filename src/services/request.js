import axios from "axios";

const axiosRequestInstance = axios.create({
  baseURL: `http:localhost:3003`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default { axiosRequestInstance };
