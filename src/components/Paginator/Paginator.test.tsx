import { render } from "@testing-library/react";

import Paginator from ".";

describe("Paginator", () => {
  it("should render 10 pages", () => {
    const { getAllByRole } = render(
      <Paginator currentPage={0} totalPages={10} onClickPage={() => {}} />
    );
    expect(getAllByRole("button").length).toBe(10);
  });

  it("should render 10 pages with the first one disabled", () => {
    const { getAllByRole } = render(
      <Paginator currentPage={0} totalPages={10} onClickPage={() => {}} />
    );
    expect(getAllByRole("button")[0]).toBeDisabled();
  });

  it("should render 10 pages with the second one enabled", () => {
    const { getAllByRole } = render(
      <Paginator currentPage={0} totalPages={10} onClickPage={() => {}} />
    );
    expect(getAllByRole("button")[1]).not.toBeDisabled();
  });

  it("should render 10 pages with the last one enabled", () => {
    const { getAllByRole } = render(
      <Paginator currentPage={0} totalPages={10} onClickPage={() => {}} />
    );
    expect(getAllByRole("button")[9]).not.toBeDisabled();
  });

  it("should render 10 pages with the last one disabled", () => {
    const { getAllByRole } = render(
      <Paginator currentPage={9} totalPages={10} onClickPage={() => {}} />
    );
    expect(getAllByRole("button")[9]).toBeDisabled();
  });
});
