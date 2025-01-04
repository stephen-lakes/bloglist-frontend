import axios from "axios";

const login = (credentials) => {
  const response = axioss.post(baseUrl, credentials);
  return response.data;
};

export default { login };
