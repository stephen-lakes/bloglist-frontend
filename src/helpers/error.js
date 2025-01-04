const handleError = (error) => {
  switch (error.status) {
    case 400:
      console.error("Bad Request");
      break;
    case 404:
      console.error("User Not Found");
      break;
    case 401:
      console.error(`Invalid Login Credentials`);
      break;
    default:
      console.error(
        `Login failed\nAn error occurred during login:`,
        error.message
      );
  }
};

export default handleError;
