import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import handleError from "./helpers/error";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

      if (response.success !== false) {
        window.localStorage.setItem(
          "loggedInBlogUser",
          JSON.stringify(response)
        );
        setUser(response.data);
        setUsername("");
        setPassword("");
        console.log("Logged in successfully");
      } else handleError(response);
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

  if (user === null) {
    return (
      <div>
        <h2>log in to the application</h2>
        <form onSubmit={handleLogin}>
          Username:
          <input
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            value={username}
          />
          <br />
          Password:
          <input
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            value={password}
          />
          <br />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>
      <form>
        title: <input type="text" />
        <br />
        author: <input type="text" />
        <br />
        url: <input type="text" />
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
