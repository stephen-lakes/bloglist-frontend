import axios from "axios";
import { getToken } from "../helpers/authUtils";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const addNewBlog = async (payload) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("BEFORE =>>>");
    const response = await axios.post(baseUrl, payload, config);
    console.log("AFTER =>>>");
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
