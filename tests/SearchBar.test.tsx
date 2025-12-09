import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/ui/SearchBar";

describe("SearchBar component", () => {
  it("renders placeholder and results count", () => {
    render(
      <SearchBar value="" onChange={() => {}} resultsCount={10} />
    );

    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER...")
    ).toBeInTheDocument();

    expect(screen.getByText("10 RESULTS")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <SearchBar value="" onChange={handleChange} resultsCount={0} />
    );

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER...");

    await user.type(input, "captain");

    expect(handleChange).toHaveBeenCalled();
  });
});