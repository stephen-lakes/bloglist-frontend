import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
