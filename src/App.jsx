import { useState, useEffect, useRef } from "react";
import { AddNewBlogForm, BlogList } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import handleError from "./helpers/error";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";

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
      setSuccessMessage("Logged out successfully");
      setTimeout(() => setSuccessMessage(null), 1000);
    }
  };

  const renderLoginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
      />
    </Togglable>
  );

  const addBlog = async (blogObj) => {
    try {
      const response = await blogService.addNewBlog(blogObj);
      if (response.success !== false) {
        console.log("Blog created successfully", response.data);
        setBlogs(blogs.concat(response.data));
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

  const updateBlogLike = async (blogId, blogObj) => {
    try {
      const response = await blogService.updateBlogLike(blogId, blogObj);
      if (response.success) console.log("Like updated");
    } catch (error) {
      handleError(error);
    }
  };

  const deleteBlog = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmDelete)
      try {
        const response = await blogService.deleteBlog(blog.id);
        if (response.success) console.log(`Blog deleted`);
      } catch (error) {
        handleError(error);
      }
  };

  const blogFormRef = useRef();

  const renderBlogForm = () => (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <p>user id {user.id}</p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <AddNewBlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList
        blogs={blogs}
        updateBlogLike={updateBlogLike}
        deleteBlog={deleteBlog}
      />
    </div>
  );

  return (
    <div>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <h2>blogs</h2>

      {user === null ? renderLoginForm() : renderBlogForm()}
    </div>
  );
};

export default App;
