import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 500,
    };
  }
};

export default { login };
