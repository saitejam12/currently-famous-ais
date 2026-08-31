import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";

import Screen from "@/screens/Home";

describe("Home screen — company entries (US-002)", () => {
  it("AC-005: shows the company name and exactly one one-line description for a company section", () => {
    render(<Screen />);

    const heading = screen.getByRole("heading", { name: "OpenAI" });
    expect(heading).toBeInTheDocument();

    const section = heading.closest("section");
    expect(section).not.toBeNull();

    const description =
      "The San Francisco lab that put generative AI in front of everyone with ChatGPT.";
    const matches = within(section as HTMLElement).getAllByText(description);
    expect(matches).toHaveLength(1);
  });

  it("AC-006: shows the logo alongside the company name with descriptive alternative text when a logo is available", () => {
    render(<Screen />);

    const heading = screen.getByRole("heading", { name: "OpenAI" });
    const section = heading.closest("section") as HTMLElement;

    const logo = within(section).getByRole("img", { name: "OpenAI logo" });
    expect(logo).toBeInTheDocument();
  });

  it("AC-007: renders cleanly without a logo or broken image placeholder when no logo is available", () => {
    render(<Screen />);

    const heading = screen.getByRole("heading", { name: "xAI" });
    const section = heading.closest("section") as HTMLElement;

    expect(section).toHaveTextContent("Elon Musk's lab, whose Grok models sit inside X.");
    expect(within(section).queryByRole("img")).not.toBeInTheDocument();
    expect(section.querySelectorAll("img")).toHaveLength(0);
  });

  it("does not render any broken native <img> placeholders anywhere on the page", () => {
    render(<Screen />);
    expect(document.querySelectorAll("img")).toHaveLength(0);
  });
});
