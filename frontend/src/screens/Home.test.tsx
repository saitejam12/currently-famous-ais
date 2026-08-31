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

  it("AC-005: every company section shows exactly one name and one description", () => {
    render(<Screen />);

    const companies = [
      {
        name: "Google DeepMind",
        description:
          "Google's combined research arm, shipping the Gemini family across search, Android and Workspace."
      },
      { name: "Anthropic", description: "A safety-focused lab founded by former OpenAI researchers, maker of Claude." },
      { name: "Meta AI", description: "Facebook's parent company, which gives its Llama models away as open weights." }
    ];

    for (const company of companies) {
      const heading = screen.getByRole("heading", { name: company.name });
      const section = heading.closest("section") as HTMLElement;
      expect(within(section).getAllByText(company.description)).toHaveLength(1);
    }
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

  it("AC-007: a second logo-less company (Mistral AI) also renders cleanly with no image element", () => {
    render(<Screen />);

    const heading = screen.getByRole("heading", { name: "Mistral AI" });
    const section = heading.closest("section") as HTMLElement;

    expect(section).toHaveTextContent(
      "The Paris lab that became Europe's answer to the American frontier labs."
    );
    expect(within(section).queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render any broken native <img> placeholders anywhere on the page", () => {
    render(<Screen />);
    expect(document.querySelectorAll("img")).toHaveLength(0);
  });
});
