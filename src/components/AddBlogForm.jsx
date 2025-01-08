import { useState } from "react";

const AddNewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
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

export default AddNewBlogForm;
