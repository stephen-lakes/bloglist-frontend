import { useState } from "react";
import Togglable from "./Togglable";
import { getUser } from "../helpers/authUtils";

const Blog = ({ blog, updateBlogLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className="blog-container" style={blogStyle}>
      {/* <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-author">author {blog.author}</p> */}
      {blog.title}
      <Togglable buttonLabel="view" closeButtonLabel="hide">
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          likes {blog.likes}
          <button
            onClick={() =>
              updateBlogLike(blog.id, { ...blog, user: getUser().id,  likes: blog.likes + 1 })
            }
          >
            like
          </button>
          <br />
          {blog.author} <br />
          <button onClick={() => console.log("REOMOVE CLICKED=>>>")}>
            remove
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export const BlogList = ({ blogs, updateBlogLike }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlogLike={updateBlogLike} />
      ))}
    </>
  );
};

export const AddNewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
      userId: JSON.parse(window.localStorage.getItem("loggedInBlogUser")).id,
    });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="add-blog-form-container">
      <form onSubmit={addBlog} className="add-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className="form-input"
          />
        </div>
        <input type="submit" value="Create" className="form-submit" />
      </form>
    </div>
  );
};
