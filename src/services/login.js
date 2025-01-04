import axios from "axios";

const login = (credentials) => {
  const response = axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
