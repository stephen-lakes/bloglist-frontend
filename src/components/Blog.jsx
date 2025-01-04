const Blog = ({ blog }) => (
  <div className="blog-container">
    <h2 className="blog-title">{blog.title}</h2>
    <p className="blog-author">{blog.author}</p>
  </div>  
);

export default Blog;
