import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data)
      return {
        success: false,
        message: error.response.data.message || "An unknown error occured",
      };
    else {
      return {
        success: false,
        message: "Network error or server not responding",
      };
    }
  }
};

export default { login };
