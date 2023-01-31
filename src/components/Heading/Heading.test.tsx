import { render } from "@testing-library/react";
import Heading from ".";

describe("Heading", () => {
  it("renders children without crashing", () => {
    const { getByText } = render(<Heading>Zeelo Assignment</Heading>);
    expect(getByText(/Zeelo Assignment/)).toBeInTheDocument();
  });
});
