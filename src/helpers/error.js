const handleError = (result) => {
  switch (result.status) {
    case 404:
      console.error("User Not Found");
      break;
    case 401:
      console.error("Invalid Login Credentials");
      break;
    default:
      console.error("Login failed:", result.message);
  }
};

export default handleError;
