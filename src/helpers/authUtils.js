export const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedInBlogUser"));
  return user?.token || null;
};

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem("loggedInBlogUser")) || null;
};
