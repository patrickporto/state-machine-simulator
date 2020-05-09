import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

test("renders app body link", () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText(/app body/i);
    expect(linkElement).toBeInTheDocument();
});
