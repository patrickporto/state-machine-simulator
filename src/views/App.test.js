import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app body link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/My App/i);
    expect(linkElement).toBeInTheDocument();
});
