import { useState, useEffect } from "react";
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
      setSuccessMessage("Logged out successfully");
      setTimeout(() => setSuccessMessage(null), 1000);
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
        setBlogs(blogs.concat(returnedNote));
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

  const renderBlogForm = () => (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <p>user id {user.id}</p>

      <Togglable buttonLabel="Add Blog">
        <h2>create new</h2>
        <AddNewBlogForm
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </Togglable>
      <BlogList blogs={blogs} />
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
