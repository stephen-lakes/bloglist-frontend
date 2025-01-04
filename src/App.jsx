import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import handleError from "./helpers/error";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <>
      <div className={`${type === "success" ? "success" : "error"}`}>
        {message}
      </div>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInBlogUserJSON =
      window.localStorage.getItem("loggedInBlogUser");
    if (loggedInBlogUserJSON) {
      const user = JSON.parse(loggedInBlogUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const credentials = { username, password };
      const response = await loginService.login(credentials);

      if (response.success) {
        window.localStorage.setItem(
          "loggedInBlogUser",
          JSON.stringify(response.data)
        );
        setUser(response.data);
        setUsername("");
        setPassword("");
        console.log("Logged in successfully", response.data);
        setSuccessMessage("Log in successful");
        setTimeout(() => setSuccessMessage(null), 1000);
      } else {
        setErrorMessage("Invalid Username or Password");
        setTimeout(() => setErrorMessage(null), 1000);
      }
      console.log("=>>> AFTER", response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogout = () => {
    const key = "loggedInBlogUser";

    if (window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key);
      setUser(null);
      console.log("Logged out");
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.addNewBlog({
        title,
        author,
        url,
        userId: user.id,
      });
      if (response.success !== false) {
        setTitle("");
        setAuthor("");
        setUrl("");
        console.log("Blog created successfully", response.data);
        setSuccessMessage(
          `A new blog by ${response.data.title} by ${user.name} added`
        );
        setTimeout(() => setSuccessMessage(null), 5000);
      } else handleError(response);
    } catch (error) {
      handleError(error);
      setErrorMessage("Invalid Request, make sure all field are filled");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />
        <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-form">
            <h2>log in to the application</h2>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                onChange={({ target }) => setUsername(target.value)}
                type="text"
                value={username}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                onChange={({ target }) => setPassword(target.value)}
                type="password"
                value={password}
                className="form-input"
              />
            </div>
            <input type="submit" value="Login" className="form-submit" />
          </form>
        </div>
      </>
    );
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <p>user id {user.id}</p>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
        <br />
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
        <br />
        <input type="submit" value="create" />
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
