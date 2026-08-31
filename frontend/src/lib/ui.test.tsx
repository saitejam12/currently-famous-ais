// Behavioural tests for the shared UI vocabulary. These assert what a person
// using a generated screen would see and do -- text rendered, roles exposed,
// handlers invoked -- and, where the component's own docstring promises it,
// that brand tokens are actually wired in as inline styles rather than
// baked-in colors. They deliberately avoid asserting Tailwind class names:
// a restyle should be free to change those without breaking this suite.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Empty,
  Input,
  Label,
  Select,
  Separator,
  Stat,
  Switch,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  Tabs,
  Textarea,
} from "./ui";

describe("Button", () => {
  it("fires its click handler when enabled", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire its click handler when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("wires the primary variant's background to the brand token", () => {
    render(<Button variant="primary">Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveStyle({
      backgroundColor: "var(--brand-primary)",
    });
  });

  it("does not apply the brand background color to non-primary variants", () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button", { name: "Cancel" })).not.toHaveStyle({
      backgroundColor: "var(--brand-primary)",
    });
  });
});

describe("Card composition", () => {
  it("assembles a full card from its header, content and footer parts", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Everything included</CardDescription>
        </CardHeader>
        <CardContent>Details go here</CardContent>
        <CardFooter>
          <Button>Confirm</Button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByRole("heading", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getByText("Everything included")).toBeInTheDocument();
    expect(screen.getByText("Details go here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });
});

describe("form controls", () => {
  it("associates a Label with its control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("accepts typed text in an Input", async () => {
    render(<Input placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("accepts typed text in a Textarea", async () => {
    render(<Textarea placeholder="Notes" />);
    const textarea = screen.getByPlaceholderText("Notes");
    await userEvent.type(textarea, "multi-line note");
    expect(textarea).toHaveValue("multi-line note");
  });

  it("renders Select options from the options prop and reports a selection change", async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ]}
        defaultValue="a"
        onChange={onChange}
      />
    );
    expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Beta" })).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByRole("combobox"), "b");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveValue("b");
  });

  it("renders explicit children instead of the options prop when both could apply", () => {
    render(
      <Select options={[{ value: "a", label: "Alpha" }]}>
        <option value="x">Explicit</option>
      </Select>
    );
    expect(screen.getByRole("option", { name: "Explicit" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Alpha" })).not.toBeInTheDocument();
  });

  it("toggles a Checkbox and reports the change", async () => {
    const onChange = vi.fn();
    render(<Checkbox aria-label="Agree" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Agree" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("reflects the Switch's checked prop and reports clicks via onChange", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChange} />);
    const toggle = screen.getByRole("checkbox");
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(<Switch checked={true} onChange={onChange} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});

describe("Badge", () => {
  it("renders its label text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies the brand accent color as an inline background for the accent variant", () => {
    render(<Badge variant="accent">Featured</Badge>);
    expect(screen.getByText("Featured")).toHaveStyle({
      backgroundColor: "var(--brand-accent)",
    });
  });

  it("does not apply the brand accent background for the default variant", () => {
    render(<Badge>Plain</Badge>);
    expect(screen.getByText("Plain")).not.toHaveStyle({
      backgroundColor: "var(--brand-accent)",
    });
  });
});

describe("Table", () => {
  it("renders headers and rows a person can read", () => {
    render(
      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Score</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Ada</TD>
            <TD>98</TD>
          </TR>
          <TR>
            <TD>Grace</TD>
            <TD>95</TD>
          </TR>
        </TBody>
      </Table>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader").map((el) => el.textContent)).toEqual([
      "Name",
      "Score",
    ]);
    expect(screen.getByRole("cell", { name: "Ada" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Grace" })).toBeInTheDocument();
  });
});

describe("Avatar", () => {
  it("shows initials derived from the name when there is no image", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders an accessible image and hides the initials when a src is given", () => {
    render(<Avatar name="Jane Doe" src="/jane.png" />);
    const img = screen.getByRole("img", { name: "Jane Doe" });
    expect(img).toHaveAttribute("src", "/jane.png");
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("reports the key of the tab a person clicks", async () => {
    const onChange = vi.fn();
    render(
      <Tabs
        tabs={[
          { key: "overview", label: "Overview" },
          { key: "details", label: "Details" },
        ]}
        active="overview"
        onChange={onChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(onChange).toHaveBeenCalledWith("details");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe("Stat", () => {
  it("renders the label and value, and the hint only when provided", () => {
    const { rerender } = render(<Stat label="Users" value={42} hint="This month" />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("This month")).toBeInTheDocument();

    rerender(<Stat label="Users" value={42} />);
    expect(screen.queryByText("This month")).not.toBeInTheDocument();
  });
});

describe("Empty", () => {
  it("always renders the title, and the description and action only when given", () => {
    const { rerender } = render(<Empty title="No results" />);
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(
      <Empty
        title="No results"
        description="Try adjusting your filters"
        action={<Button>Reset filters</Button>}
      />
    );
    expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset filters" })).toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("renders as a separator a screen reader announces", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
