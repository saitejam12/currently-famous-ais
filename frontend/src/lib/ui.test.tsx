/**
 * Unit tests for the component vocabulary in ./ui.tsx.
 *
 * This ticket carries no acceptance criteria of its own -- ui.tsx is the
 * shared building-block kit generated screens are written against, so the
 * contract worth protecting is behavioural: a button that clicks, a field
 * that reports what was typed, a toggle that flips, a table that renders
 * the rows it was given. We deliberately do not assert class names or
 * inline styles (the CSS-custom-property theming described in the file's
 * own header comment) because a restyle that changes those strings breaks
 * nothing a user notices, and a test that pins them fails for the wrong
 * reason.
 */
import { render, screen, within } from "@testing-library/react";
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
  it("renders its label and fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Card", () => {
  it("composes header, content and footer into one region with the given text", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Internal prototype</CardDescription>
        </CardHeader>
        <CardContent>Body copy goes here.</CardContent>
        <CardFooter>
          <Button>Archive</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole("heading", { name: "Project Alpha" })).toBeInTheDocument();
    expect(screen.getByText("Internal prototype")).toBeInTheDocument();
    expect(screen.getByText("Body copy goes here.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
  });
});

describe("form fields", () => {
  it("Input reports what the user typed", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Project name" />);

    const field = screen.getByLabelText("Project name");
    await user.type(field, "Currently Famous AIs");

    expect(field).toHaveValue("Currently Famous AIs");
  });

  it("Textarea reports what the user typed", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" />);

    const field = screen.getByLabelText("Notes");
    await user.type(field, "multi-line note");

    expect(field).toHaveValue("multi-line note");
  });

  it("Label associates with its field via htmlFor so the field is reachable by its label text", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("Select renders options from the options prop and reports the chosen value", async () => {
    const user = userEvent.setup();
    render(
      <Select
        aria-label="Role"
        options={[
          { value: "admin", label: "Admin" },
          { value: "viewer", label: "Viewer" },
        ]}
      />
    );

    const select = screen.getByLabelText("Role");
    expect(screen.getByRole("option", { name: "Admin" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Viewer" })).toBeInTheDocument();

    await user.selectOptions(select, "viewer");
    expect(select).toHaveValue("viewer");
  });

  it("Checkbox toggles checked state when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);

    const checkbox = screen.getByLabelText("Accept terms");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe("Switch", () => {
  it("calls onChange with the flipped value when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);

    const toggle = screen.getByRole("checkbox", { hidden: true });
    await user.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("reflects the checked prop it is given", () => {
    render(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("checkbox", { hidden: true })).toBeChecked();
  });
});

describe("Badge", () => {
  it("renders the text it is given", () => {
    render(<Badge>Live</Badge>);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });
});

describe("Table", () => {
  it("renders header and body rows with the given cell content", () => {
    render(
      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Ada Lovelace</TD>
            <TD>Active</TD>
          </TR>
        </TBody>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(within(table).getByText("Name")).toBeInTheDocument();
    expect(within(table).getByText("Status")).toBeInTheDocument();
    expect(within(table).getByText("Ada Lovelace")).toBeInTheDocument();
    expect(within(table).getByText("Active")).toBeInTheDocument();
  });
});

describe("Avatar", () => {
  it("derives initials from up to the first two words of the name", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("derives a single initial from a one-word name", () => {
    render(<Avatar name="Cher" />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("renders an image with the name as alt text when a src is given, instead of initials", () => {
    render(<Avatar name="Ada Lovelace" src="/ada.png" />);

    const image = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(image).toHaveAttribute("src", "/ada.png");
    expect(screen.queryByText("AL")).not.toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("renders as a horizontal rule", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("renders every tab label and calls onChange with the key of the clicked tab", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs
        tabs={[
          { key: "overview", label: "Overview" },
          { key: "settings", label: "Settings" },
        ]}
        active="overview"
        onChange={onChange}
      />
    );

    expect(screen.getByRole("button", { name: "Overview" })).toBeInTheDocument();
    const settingsTab = screen.getByRole("button", { name: "Settings" });

    await user.click(settingsTab);

    expect(onChange).toHaveBeenCalledWith("settings");
  });
});

describe("Stat", () => {
  it("renders label and value, and the hint only when one is given", () => {
    const { rerender } = render(<Stat label="Signups" value={128} />);
    expect(screen.getByText("Signups")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();

    rerender(<Stat label="Signups" value={128} hint="up 4% this week" />);
    expect(screen.getByText("up 4% this week")).toBeInTheDocument();
  });
});

describe("Empty", () => {
  it("renders the title, an optional description, and a provided action", () => {
    render(
      <Empty
        title="No projects yet"
        description="Create your first project to get started."
        action={<Button>New project</Button>}
      />
    );

    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(screen.getByText("Create your first project to get started.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New project" })).toBeInTheDocument();
  });

  it("omits the description paragraph when none is given", () => {
    render(<Empty title="Nothing here" />);

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.queryByText(/create your first/i)).not.toBeInTheDocument();
  });
});
