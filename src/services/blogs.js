import axios from "axios";
import { getToken, getUser } from "../helpers/authUtils";
import handleError from "../helpers/error";
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
    const response = await axios.post(
      baseUrl,
      {
        ...payload,
        userId: getUser().id,
      },
      config
    );
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

const deleteBlog = async (blogId) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("BEFORE =>>>");
    const response = await axios.delete(baseUrl + `/${blogId}`, config);
    console.log("AFTER =>>>", response);
    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    handleError(error);
  }
};

const updateBlogLike = async (blogId, payload) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("BEFORE =>>>");
    const response = await axios.put(baseUrl + `/${blogId}`, payload, config);
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

export default { getAll, addNewBlog, updateBlogLike, deleteBlog };
