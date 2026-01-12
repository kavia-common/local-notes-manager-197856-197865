import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header and add note action", () => {
  render(<App />);
  expect(screen.getByText(/Local Notes/i)).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /Add Note/i }).length).toBeGreaterThan(0);
});
