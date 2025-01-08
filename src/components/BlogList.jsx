import Blog from "./Blog";

const BlogList = ({ blogs, updateBlogLike, deleteBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogLike={updateBlogLike}
          deleteBlog={deleteBlog}
        />
      ))}
    </>
  );
};

export default BlogList;
