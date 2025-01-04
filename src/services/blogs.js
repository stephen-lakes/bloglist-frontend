import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewBlog = async (payload) => {
  try {
    const response = await axios.post(baseUrl, payload);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occured";
    const stausCode = error.response?.status || 500;

    throw {
      success: false,
      message: errorMessage,
      status: stausCode,
    };
  }
};

export default { getAll, addNewBlog };
