import { render, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import AddNewBlogForm from "./AddBlogForm";
import userEvent from "@testing-library/user-event";

test("", () => {
  const user = userEvent.setup();

  const createBlogMockHandler = vi.fn();
  const { container } = render(
    <AddNewBlogForm createBlog={createBlogMockHandler} />
  );

  const title = container.querySelector(`#title`);
  const author = container.querySelector(`#author`);
  const url = container.querySelector(`#title`);
  const submitButton = container.querySelector(`.form-submit`);

  // Fill the form
  user.type(title, `Test Blog`);
  user.type(author, `Test Author`);
  user.type(url, `http://test.com`);

  // Submit form
  fireEvent.submit(submitButton);

  expect(createBlogMockHandler).toHaveBeenCalled({
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
  });
});
