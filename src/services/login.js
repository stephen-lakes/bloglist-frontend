import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";

    return {
      success: false,
      message: error.response
        ? errorMessage
        : "Network error or server not responding",
    };
  }
};

export default { login };
