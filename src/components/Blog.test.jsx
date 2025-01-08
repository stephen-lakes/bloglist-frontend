import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test } from "vitest";

test(`renders title and author, but does not URL or likes by default`, () => {
  const blog = {
    title: `My Backend Projects Showcase`,
    author: `Stephen Oluyomi`,
    url: `https://stephen-dev-frontend.onrender.com/projects`,
    likes: `200000003`,
  };
  const { container } = render(
    <Blog blog={blog} updateBlogLike={() => {}} deleteBlog={() => {}} />
  );
  const title = container.querySelector(`#blog-title`);
  const author = container.querySelector(`#blog-author`);
  const url = container.querySelector(`#blog-url`);
  const likes = container.querySelector(`#blog-likes`);

  expect(title).toHaveStyle(`display: block`);
  expect(author).toHaveStyle(`display: block`);
  expect(url).not.toHaveStyle(`display: ''`);
  expect(likes).not.toHaveStyle(`display: ''`);
});
