import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icons, ICON_NAMES } from "./icons";

describe("Icons", () => {
  it("exposes an entry in Icons for every name listed in ICON_NAMES, and nothing extra", () => {
    expect(Object.keys(Icons).sort()).toEqual([...ICON_NAMES].sort());
  });

  it("ICON_NAMES is non-empty -- the whole point of the module is a finite, usable set", () => {
    expect(ICON_NAMES.length).toBeGreaterThan(0);
  });

  it("renders every named icon as an svg with no crash and no empty markup", () => {
    for (const name of ICON_NAMES) {
      const IconComponent = Icons[name];
      const { container, unmount } = render(<IconComponent />);
      const svg = container.querySelector("svg");
      expect(svg, `${name} did not render an <svg>`).not.toBeNull();
      // A path-less icon (a typo in the paths map) would render an svg with
      // no children -- a blank square at runtime. Catch that here instead.
      expect(
        svg?.children.length,
        `${name} rendered an <svg> with no drawable children`
      ).toBeGreaterThan(0);
      unmount();
    }
  });

  it("defaults to a 16x16 icon so a generated screen gets a sane size without setting one", () => {
    const Check = Icons.Check;
    const { container } = render(<Check />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  it("honours an explicit size prop for both width and height", () => {
    const Check = Icons.Check;
    const { container } = render(<Check size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("keeps the viewBox fixed at 0 0 24 24 regardless of the rendered size", () => {
    const Check = Icons.Check;
    const { container } = render(<Check size={64} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("is hidden from assistive tech, since it is decorative on its own", () => {
    const Plus = Icons.Plus;
    const { container } = render(<Plus />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards arbitrary svg props, e.g. className and onClick, like any other component", () => {
    const Plus = Icons.Plus;
    const { container } = render(<Plus className="text-red-500" data-testid="plus-icon" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-red-500");
    expect(svg).toHaveAttribute("data-testid", "plus-icon");
  });

  it("renders visibly distinct markup for two different icons, so they are not accidental aliases of each other", () => {
    const { container: a } = render(<Icons.Plus />);
    const { container: b } = render(<Icons.X />);
    expect(a.querySelector("svg")?.innerHTML).not.toEqual(
      b.querySelector("svg")?.innerHTML
    );
  });

  it("looking up a name that is not in the set is undefined, not a silent blank icon", () => {
    expect(Icons.NotARealIconName).toBeUndefined();
  });
});
