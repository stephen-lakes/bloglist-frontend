import axiosRequestInstance from "./request";

const login = async (credentials) => {
  const response = await axiosRequestInstance.post("/login", credentials);
  return response.data;
};

export default { login };
