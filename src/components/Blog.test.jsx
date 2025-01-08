import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

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
  const urlAndLikesContainer = container.querySelector(`#children-container`);

  expect(title).toHaveStyle(`display: block`);
  expect(author).toHaveStyle(`display: block`);
  expect(urlAndLikesContainer).toHaveStyle(`display: none `);
});

test("shows URL and number of likes when the view button is clicked", async () => {
  const blog = {
    title: `My Backend Projects Showcase`,
    author: `Stephen Oluyomi`,
    url: `https://stephen-dev-frontend.onrender.com/projects`,
    likes: `200000003`,
  };
  const { container } = render(
    <Blog blog={blog} updateBlogLike={() => {}} deleteBlog={() => {}} />
  );
  const urlAndLikesContainer = container.querySelector(`#children-container`);

  const viewButton = screen.getByText(`view`);
  await userEvent.click(viewButton);

  expect(urlAndLikesContainer).toHaveStyle(`display: block`);
});

test("calls updateBlogLike handler twice when the like button is clicked twice", async () => {
  const updateBlogMockHandler = vi.fn();

  const blog = {
    title: `My Backend Projects Showcase`,
    author: `Stephen Oluyomi`,
    url: `https://stephen-dev-frontend.onrender.com/projects`,
    likes: `200000003`,
  };
  render(
    <Blog
      blog={blog}
      updateBlogLike={updateBlogMockHandler}
      deleteBlog={() => {}}
    />
  );

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  // Simulate two clicks on the "like" button
  await user.click(likeButton);
  await user.click(likeButton);

  expect(updateBlogMockHandler.mock.calls).toHaveLength(2);
});
