const Blog = ({ blog }) => (
  <div className="blog-container">
    <h2 className="blog-title">{blog.title}</h2>
    <p className="blog-author">author {blog.author}</p>
  </div>
);

export const AddNewBlogForm = ({ addBlog, title, author, url }) => {
  return (
    <>
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
    </>
  );
};

export default Blog;
