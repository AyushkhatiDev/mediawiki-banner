
import { render, screen } from "@testing-library/react";
import Banner from "../Banner";

describe("Banner Component", () => {
  const defaultProps = {
    text: "Test Banner",
    background: "#000000",
    image: ""
  };

  test("renders banner text", () => {
    render(<Banner {...defaultProps} />);
    expect(screen.getByText("Test Banner")).toBeInTheDocument();
  });

  test("displays placeholder text when no text is provided", () => {
    render(<Banner {...defaultProps} text="" />);
    expect(screen.getByText("Enter banner text")).toBeInTheDocument();
  });
});