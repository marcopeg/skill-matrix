import { render, screen } from "@testing-library/react";
import { Page } from "./Page";

describe("Page", () => {
  it("should render", () => {
    render(<Page>foobar</Page>);
    const linkElement = screen.getByText(/foobar/i);
    expect(linkElement).toBeInTheDocument();
  });
});
