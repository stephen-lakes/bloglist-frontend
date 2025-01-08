import { useState } from "react";
import Togglable from "./Togglable";
import { getUser } from "../helpers/authUtils";

const Blog = ({ blog, updateBlogLike, deleteBlog }) => {
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
              updateBlogLike(blog.id, {
                ...blog,
                user: getUser().id,
                likes: blog.likes + 1,
              })
            }
          >
            like
          </button>
          <br />
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      </Togglable>
      {blog.author} <br />
    </div>
  );
};

export default Blog;
