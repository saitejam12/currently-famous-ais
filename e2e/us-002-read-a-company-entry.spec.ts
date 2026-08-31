import { test, expect, type Page } from "@playwright/test";

// US-002 -- Read a company entry
//
// Companies and their one-line descriptions/logo alt text as authored in
// frontend/src/screens/Home.tsx. Mirrored here deliberately: the acceptance
// criteria are about what a visitor actually sees on the rendered page, so
// this suite drives a real browser against the built app rather than
// importing the component's data module.
const COMPANIES_WITH_LOGO = [
  {
    name: "OpenAI",
    description: "The San Francisco lab that put generative AI in front of everyone with ChatGPT.",
    logoAlt: "OpenAI logo"
  },
  {
    name: "Google DeepMind",
    description:
      "Google's combined research arm, shipping the Gemini family across search, Android and Workspace.",
    logoAlt: "Google DeepMind logo"
  },
  {
    name: "Anthropic",
    description: "A safety-focused lab founded by former OpenAI researchers, maker of Claude.",
    logoAlt: "Anthropic logo"
  },
  {
    name: "Meta AI",
    description: "Facebook's parent company, which gives its Llama models away as open weights.",
    logoAlt: "Meta AI logo"
  },
  {
    name: "Microsoft AI",
    description: "Ships AI to a billion desktops through Copilot, and trains small models of its own.",
    logoAlt: "Microsoft AI logo"
  }
];

const COMPANIES_WITHOUT_LOGO = [
  {
    name: "xAI",
    description: "Elon Musk's lab, whose Grok models sit inside X."
  },
  {
    name: "Mistral AI",
    description: "The Paris lab that became Europe's answer to the American frontier labs."
  }
];

const ALL_COMPANIES = [
  ...COMPANIES_WITH_LOGO.map((c) => ({ name: c.name, description: c.description })),
  ...COMPANIES_WITHOUT_LOGO
];

// A company's <h2> carries the name and an aria-labelledby link from the
// enclosing <section> -- following that ancestor is how a screen reader (and
// this test) associates the heading with its section, rather than assuming
// DOM order.
function companySection(page: Page, name: string) {
  const heading = page.getByRole("heading", { level: 2, name, exact: true });
  return heading.locator("xpath=ancestor::section[1]");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/home");
});

test.describe("AC-005: a company section shows the name and exactly one one-line description", () => {
  for (const company of ALL_COMPANIES) {
    test(`${company.name} renders its name and description exactly once`, async ({ page }) => {
      const section = companySection(page, company.name);
      await expect(section).toBeVisible();

      // Exactly one occurrence of the one-line description inside the
      // section -- not zero (missing) and not duplicated.
      await expect(section.getByText(company.description, { exact: true })).toHaveCount(1);
    });
  }
});

test.describe("AC-006: a company with a logo shows it alongside the name with descriptive alt text", () => {
  for (const company of COMPANIES_WITH_LOGO) {
    test(`${company.name} shows its logo with the alt text "${company.logoAlt}"`, async ({ page }) => {
      const section = companySection(page, company.name);

      // The logo is exposed with an accessible name distinct from the
      // company name itself ("<Company> logo"), so a screen reader user
      // hears it is a logo, not a second copy of the heading.
      const logo = section.getByRole("img", { name: company.logoAlt, exact: true });
      await expect(logo).toBeVisible();

      await expect(section.getByRole("heading", { level: 2, name: company.name })).toBeVisible();
    });
  }
});

test.describe("AC-007: a company without a logo still renders cleanly with no broken image placeholder", () => {
  for (const company of COMPANIES_WITHOUT_LOGO) {
    test(`${company.name} renders name and description with no image element in its section`, async ({
      page
    }) => {
      const section = companySection(page, company.name);
      await expect(section).toBeVisible();
      await expect(section.getByText(company.description, { exact: true })).toBeVisible();

      // No img role at all for this company -- not an <img> with a failed
      // src, which is the "broken image placeholder" a visitor would see.
      await expect(section.getByRole("img")).toHaveCount(0);
    });
  }

  test("no image anywhere on the page fails to load (no broken image placeholder)", async ({ page }) => {
    const brokenImages = await page.locator("img").evaluateAll((imgs) =>
      (imgs as HTMLImageElement[])
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src)
    );
    expect(brokenImages).toEqual([]);
  });
});

test.describe("Integration: company entry and its model list render together", () => {
  test("a company section pairs its name, description and logo with its own list of models", async ({
    page
  }) => {
    const section = companySection(page, "OpenAI");

    await expect(section.getByRole("heading", { level: 2, name: "OpenAI" })).toBeVisible();
    await expect(section.getByRole("img", { name: "OpenAI logo" })).toBeVisible();
    await expect(
      section.getByText("The San Francisco lab that put generative AI in front of everyone with ChatGPT.")
    ).toBeVisible();

    // company_card depends on model_list: the section is not just the card,
    // it carries that company's own models alongside it.
    await expect(section.getByRole("link", { name: "GPT-5" })).toBeVisible();
    await expect(section.getByRole("link", { name: "Sora" })).toBeVisible();
    // A different company's model must not leak into this section.
    await expect(section.getByRole("link", { name: "Grok 4" })).toHaveCount(0);
  });

  test("a visitor can reach a company entry from the index and read it without prior knowledge", async ({
    page
  }) => {
    await page.getByRole("button", { name: /Mistral AI/ }).click();

    const section = companySection(page, "Mistral AI");
    await expect(section).toBeInViewport();
    await expect(
      section.getByText("The Paris lab that became Europe's answer to the American frontier labs.")
    ).toBeVisible();
    await expect(section.getByRole("img")).toHaveCount(0);
  });
});
