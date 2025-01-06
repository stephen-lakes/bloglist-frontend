import { useState } from "react";

const Blog = ({ blog }) => (
  <div className="blog-container">
    <h2 className="blog-title">{blog.title}</h2>
    <p className="blog-author">author {blog.author}</p>
  </div>
);

export const BlogList = ({ blogs }) => (
  <>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </>
);

export const AddNewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
