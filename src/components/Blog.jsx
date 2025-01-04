const Blog = ({ blog }) => (
  <div className="blog-container">
    <h2 className="blog-title">{blog.title}</h2>
    <p className="blog-author">author {blog.author}</p>
  </div>
);

export const AddNewBlogForm = ({ addBlog, title, author, url }) => {
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

export default Blog;
