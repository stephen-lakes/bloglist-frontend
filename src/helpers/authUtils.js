export const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedInBlogUser"));
  return user?.token || null;
};

export const getUser = () => {
  const user =
    JSON.parse(window.localStorage.getItem("loggedInBlogUser")) || null;
  return user || null;
};
