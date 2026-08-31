import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

import { test, expect } from "@playwright/test";

/**
 * US-017 — Hand-over notes for editing the content later.
 *
 * These notes (frontend/HANDOVER.md) are documentation, not a running
 * screen or endpoint, so the criteria below are proved by reading the
 * file itself: if a future edit removes the explanation a criterion
 * depends on, these tests fail exactly the way a broken page would.
 */

const HANDOVER_PATH = path.join(process.cwd(), "frontend", "HANDOVER.md");

function readHandover(): string {
  expect(existsSync(HANDOVER_PATH), `expected ${HANDOVER_PATH} to exist`).toBe(true);
  return readFileSync(HANDOVER_PATH, "utf-8");
}

test.describe("US-017 hand-over notes", () => {
  test("AC-042: explains where to add or edit a company section, add or edit a model (with description, release year and outbound link), and where to change the 'as of' date", () => {
    const notes = readHandover();

    // Points at the one file someone with no framework knowledge needs to open.
    expect(notes).toContain("frontend/src/screens/Home.tsx");

    // Explains the company section: how to add/edit one, and its fields.
    expect(notes.toLowerCase()).toMatch(/adding or editing a company/);
    expect(notes).toMatch(/`name`/);
    expect(notes).toMatch(/`description`/);

    // Explains the model block: how to add/edit one, including every
    // field AC-042 names explicitly.
    expect(notes.toLowerCase()).toMatch(/adding or editing a model/);
    expect(notes).toMatch(/release_year/);
    expect(notes).toMatch(/official_url/);
    expect(notes.toLowerCase()).toMatch(/outbound link/);

    // Explains where the "as of" date lives and how to change it.
    expect(notes.toLowerCase()).toMatch(/changing the "as of" date/);
    expect(notes).toMatch(/as_of_date/);
    expect(notes).toMatch(/PAGE_META/);
  });

  test("AC-043: explains how to publish an edit to the chosen free static host and where the public URL is", () => {
    const notes = readHandover();

    // The build step that turns the source into a publishable bundle.
    expect(notes).toMatch(/npm run build/);
    expect(notes).toMatch(/frontend\/dist/);

    // The chosen host from the architecture (AWS S3 + CloudFront) and the
    // steps to actually publish to it, not just name it.
    expect(notes).toMatch(/S3/);
    expect(notes).toMatch(/CloudFront/);
    expect(notes.toLowerCase()).toMatch(/upload/);
    expect(notes.toLowerCase()).toMatch(/invalidat/); // invalidate / invalidation

    // Where to find the public URL afterwards.
    expect(notes.toLowerCase()).toMatch(/where the public url is/);
    expect(notes.toLowerCase()).toMatch(/domain name/);
  });

  test("AC-044: states edits are made by hand in the source file, and that there is no admin interface or live data feed", () => {
    const notes = readHandover();

    const lower = notes.toLowerCase();

    // No admin interface / CMS / login of any kind.
    expect(lower).toMatch(/no admin (screen|interface)/);
    expect(lower).toMatch(/no login/);

    // No live data feed / automatic updates.
    expect(lower).toMatch(/no live data feed/);
    expect(lower).toMatch(/nothing updates automatically|does not read from any live data feed/);

    // Edits are made by hand, by a person, in the source file — not
    // through a database, form or write API.
    expect(lower).toMatch(/by hand/);
    expect(lower).toMatch(/no database/);
  });

  test("the README points a future editor at the hand-over notes", () => {
    const readmePath = path.join(process.cwd(), "frontend", "README.md");
    expect(existsSync(readmePath), `expected ${readmePath} to exist`).toBe(true);
    const readme = readFileSync(readmePath, "utf-8");
    expect(readme).toMatch(/HANDOVER\.md/);
  });
});
