import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icons, ICON_NAMES } from "./icons";

// The Builder prompt lists an exact, finite set of names it may reach for.
// If this list drifts from what the prompt promises, generated screens
// compile against names that silently resolve to `undefined` at runtime.
const EXPECTED_ICON_NAMES = [
  "Plus",
  "Search",
  "Check",
  "X",
  "ChevronRight",
  "ChevronLeft",
  "ChevronDown",
  "Menu",
  "User",
  "Users",
  "Settings",
  "Bell",
  "Home",
  "FileText",
  "Package",
  "Calendar",
  "Clock",
  "Trash",
  "Edit",
  "Filter",
  "Download",
  "Upload",
  "ArrowLeft",
  "ArrowRight",
  "AlertCircle",
  "CheckCircle",
  "MoreHorizontal",
];

describe("ICON_NAMES", () => {
  it("lists exactly the finite set the Builder prompt promises", () => {
    expect(ICON_NAMES.sort()).toEqual([...EXPECTED_ICON_NAMES].sort());
  });

  it("matches the keys actually exported on Icons", () => {
    expect(ICON_NAMES.sort()).toEqual(Object.keys(Icons).sort());
  });
});

describe("Icons", () => {
  it("renders every named icon as an svg with a visible glyph inside", () => {
    for (const name of ICON_NAMES) {
      const Icon = Icons[name];
      const { container, unmount } = render(<Icon data-testid="icon" />);
      const svg = container.querySelector("svg");
      expect(svg, `${name} should render an <svg>`).not.toBeNull();
      // A name with no drawing behind it renders an empty frame -- a blank
      // square rather than a compile error -- which is exactly the failure
      // mode the hand-drawn set exists to avoid.
      expect(
        svg!.childElementCount,
        `${name} should draw at least one shape`
      ).toBeGreaterThan(0);
      unmount();
    }
  });

  it("is hidden from assistive tech, since it is always decorative", () => {
    render(<Icons.Check data-testid="check" />);
    const svg = screen.getByTestId("check");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to a 16px square viewBox 0 0 24 24", () => {
    render(<Icons.Plus data-testid="plus" />);
    const svg = screen.getByTestId("plus");
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("honours a custom size prop for both width and height", () => {
    render(<Icons.Plus size={32} data-testid="plus-large" />);
    const svg = screen.getByTestId("plus-large");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("passes through arbitrary svg props such as className and onClick", () => {
    render(<Icons.X className="text-red-500" data-testid="close" />);
    const svg = screen.getByTestId("close");
    expect(svg).toHaveClass("text-red-500");
  });

  it("strokes with currentColor so an icon inherits the surrounding text color", () => {
    render(<Icons.Check data-testid="check-color" />);
    const svg = screen.getByTestId("check-color");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("fill", "none");
  });

  it("does not expose an icon under a name outside the finite set", () => {
    expect(Icons["Star"]).toBeUndefined();
    expect(ICON_NAMES).not.toContain("Star");
  });
});
