/* eslint-disable no-restricted-syntax */

import {
  BrowseTheWeb,
  Click,
  Fill,
  Focus,
  Navigate,
  Wait,
  Element,
  Screen,
} from "@g5u/web";
import { Page, expect, test as base } from "@playwright/test";
import { Actor } from "@testla/screenplay";

type MyActors = {
  actor: Actor;
};

const test = base.extend<MyActors>({
  actor: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const actor = Actor.named("TestActor").can(BrowseTheWeb.using(page));
    await use(actor);
  },
});

test.describe("Web Questions", () => {
  test("Element.visible", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(page.locator("h3", { hasText: "Data Tables" })).visible(),
      ),
    ).toBe(true);

    let visibleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.locator("h3", {
              hasText: "this does not exist",
            }),
          ).visible({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      visibleRes = true;
    }
    expect(visibleRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(
          page.locator("h3", {
            hasText: "this does not exist",
          }),
        ).not.visible(),
      ),
    ).toBe(true);

    let notVisibleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.locator("h3", { hasText: "Data Tables" }),
          ).not.visible({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      notVisibleRes = true;
    }
    expect(notVisibleRes).toBeTruthy();
  });

  test("Element.enabled", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to(
        "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled",
      ),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(page.getByRole("button", { name: "Reset" })).enabled(),
      ),
    ).toBe(true);

    let enabledRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page
              .getByRole("region", { name: "Try it" })
              .locator('iframe[title="runner"]')
              .contentFrame()
              .getByLabel("Employed:"),
          ).enabled({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      enabledRes = true;
    }
    expect(enabledRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(
          page
            .getByRole("region", { name: "Try it" })
            .locator('iframe[title="runner"]')
            .contentFrame()
            .getByLabel("Employed:"),
        ).not.enabled(),
      ),
    ).toBe(true);

    let notEnabledRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.getByRole("button", { name: "Reset" })).not.enabled({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notEnabledRes = true;
    }
    expect(notEnabledRes).toBeTruthy();
  });

  test("Element.editable", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to(
        "https://interactive-examples.mdn.mozilla.net/pages/tabbed/attribute-readonly.html",
      ),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(
          page
            .frameLocator("#output-iframe")
            .locator('input[name="firstName"]'),
        ).editable(),
      ),
    ).toBe(true);

    let editableRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.frameLocator("#output-iframe").getByRole("spinbutton"),
          ).editable({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      editableRes = true;
    }
    expect(editableRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(
          page.frameLocator("#output-iframe").getByRole("spinbutton"),
        ).not.editable(),
      ),
    ).toBe(true);

    let notEditableRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page
              .frameLocator("#output-iframe")
              .locator('input[name="firstName"]'),
          ).not.enabled({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      notEditableRes = true;
    }
    expect(notEditableRes).toBeTruthy();
  });

  test("Element.checked", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/checkboxes"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(Element.of(page.locator("//input[2]")).checked()),
    ).toBe(true);

    let checkedRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("//input[1]")).checked({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      checkedRes = true;
    }
    expect(checkedRes).toBeTruthy();

    expect(
      await actor.asks(Element.of(page.locator("//input[1]")).not.checked()),
    ).toBe(true);

    let notCheckedRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("//input[2]")).not.checked({ timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      notCheckedRes = true;
    }
    expect(notCheckedRes).toBeTruthy();
  });

  test("Element.focused", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
      Focus.on(page.locator('[id="username"]')),
    );

    expect(
      await actor.asks(Element.of(page.locator('[id="username"]')).focused()),
    ).toBe(true);

    let focusedRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator('[id="password"]')).focused({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      focusedRes = true;
    }
    expect(focusedRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator('[id="password"]')).not.focused(),
      ),
    ).toBe(true);

    let notFocusedRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator('[id="username"]')).not.focused({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notFocusedRes = true;
    }
    expect(notFocusedRes).toBeTruthy();
  });

  test("Element.inViewport", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(page.getByText("Welcome to the-internet")).inViewport(),
      ),
    ).toBe(true);

    let inViewportRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.getByText("Powered by Elemental Selenium"),
          ).inViewport({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      inViewportRes = true;
    }
    expect(inViewportRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(
          page.getByText("Powered by Elemental Selenium"),
        ).not.inViewport(),
      ),
    ).toBe(true);

    let notInViewportRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.getByText("Welcome to the-internet")).not.inViewport({
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notInViewportRes = true;
    }
    expect(notInViewportRes).toBeTruthy();
  });

  test("Element.haveText", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(Element.of(page.locator("h3")).haveText("Data Tables")),
    ).toBe(true);

    let textRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h3")).haveText("this text does not exist", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      textRes = true;
    }
    expect(textRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator("h3")).not.haveText(/[0-9]/), // RegExp that does not exist
      ),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h3")).not.haveText(["Data Tables"], {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Element.containText", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(Element.of(page.locator("h3")).containText("Tables")),
    ).toBe(true);

    let textRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h3")).containText("tables", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      textRes = true;
    }
    expect(textRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator("h3")).not.containText(/[0-9]/), // RegExp that does not exist
      ),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h3")).not.containText(["Data"], {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Element.haveValue", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );

    // fill username field with string
    await actor.attemptsTo(Fill.in(page.locator('[id="username"]'), "test"));
    // toBe.value test: expect the value of the username field to be the string 'test'
    expect(
      await actor.asks(
        Element.of(page.locator('[id="username"]')).haveValue("test"),
      ),
    ).toBe(true);

    // toBe.value test: expect the question to fail if the expected string is not correct
    let textRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator('[id="username"]')).haveValue(
            "this value is wrong",
            { timeout: 1000 },
          ),
        ),
      ).toBe(true);
    } catch (error) {
      textRes = true;
    }
    expect(textRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator('[id="username"]')).not.haveValue(
          "this value is wrong",
        ),
      ),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator('[id="username"]')).not.haveValue(/test/, {
            timeout: 1000,
          }), // RegExp for the string 'test'
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Element.haveAttribute", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(
          page.getByRole("link", { name: "Basic Auth" }),
        ).haveAttribute("href"),
      ),
    ).toBe(true);

    expect(
      await actor.asks(
        Element.of(
          page.getByRole("link", { name: "Basic Auth" }),
        ).haveAttribute("href", "/basic_auth"),
      ),
    ).toBe(true);

    let attributeRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h1")).haveAttribute("href", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      attributeRes = true;
    }
    expect(attributeRes).toBeTruthy();

    let attributeWithValueRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h1")).haveAttribute("href", "/header", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      attributeWithValueRes = true;
    }
    expect(attributeWithValueRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator("h1")).not.haveAttribute("href"),
      ),
    ).toBe(true);

    expect(
      await actor.asks(
        Element.of(page.locator("h1")).not.haveAttribute("href", "/header"),
      ),
    ).toBe(true);

    let notAttributeRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.getByRole("link", { name: "Basic Auth" }),
          ).not.haveAttribute("href", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notAttributeRes = true;
    }
    expect(notAttributeRes).toBeTruthy();

    let notAttributeWithRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.getByRole("link", { name: "Basic Auth" }),
          ).not.haveAttribute("href", "/basic_auth", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notAttributeWithRes = true;
    }
    expect(notAttributeWithRes).toBeTruthy();
  });

  test("Element.haveCSS", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(page.locator("h1")).haveCSS("display", "block"),
      ),
    ).toBe(true);

    let styleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h1")).haveCSS("display", "inline", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      styleRes = true;
    }
    expect(styleRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(page.locator("h1")).not.haveCSS("display", "inline"),
      ),
    ).toBe(true);

    let notStyleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("h1")).not.haveCSS("display", "block", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notStyleRes = true;
    }
    expect(notStyleRes).toBeTruthy();
  });

  test("Element.haveCount", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/status_codes"),
      Wait.forLoadState("networkidle"),
    );
    expect(
      await actor.asks(Element.of(page.getByRole("listitem")).haveCount(4)),
    ).toBe(true);

    let countRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.getByRole("listitem")).haveCount(5, {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      countRes = true;
    }
    expect(countRes).toBeTruthy();

    expect(
      await actor.asks(Element.of(page.getByRole("listitem")).not.haveCount(5)),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.getByRole("listitem")).not.haveCount(4, {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Element.haveScreenshot", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/shifting_content/image"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(
        Element.of(page.locator("#content").getByRole("img")).haveScreenshot(
          "element-positive.png",
        ),
      ),
    ).toBe(true);

    let screenshotRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(page.locator("#content").getByRole("img")).haveScreenshot(
            "element-negative.png",
            {
              timeout: 1000,
            },
          ),
        ),
      ).toBe(true);
    } catch (error) {
      screenshotRes = true;
    }
    expect(screenshotRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of(
          page.locator("#content").getByRole("img"),
        ).not.haveScreenshot("element-negative.png"),
      ),
    ).toBe(true);

    let noteScreenshotRes = false;
    try {
      expect(
        await actor.asks(
          Element.of(
            page.locator("#content").getByRole("img"),
          ).not.haveScreenshot("element-positive.png", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      noteScreenshotRes = true;
    }
    expect(noteScreenshotRes).toBeTruthy();
  });

  test("Screen.haveUrl", async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("https://example.com"));

    expect(await actor.asks(Screen.does.haveUrl("https://example.com"))).toBe(
      true,
    );

    // toHave.url test: expect the question to fail if the expected url is not correct
    let urlRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.haveUrl("https://example.co.jp", { timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      urlRes = true;
    }
    expect(urlRes).toBeTruthy();

    expect(
      await actor.asks(Screen.does.not.haveUrl("https://example.co.jp")),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.not.haveUrl("https://example.com", { timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Screen.haveTitle", async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("https://google.com"));

    expect(await actor.asks(Screen.does.haveTitle("Google"))).toBe(true);

    // toHave.title test: expect the question to fail if the expected title is not correct
    let titleRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.haveTitle("GIKYOKU", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      titleRes = true;
    }
    expect(titleRes).toBeTruthy();

    expect(await actor.asks(Screen.does.not.haveTitle("GIKYOKU"))).toBe(true);

    let notTitleRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.not.haveTitle("Google", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notTitleRes = true;
    }
    expect(notTitleRes).toBeTruthy();
  });

  test("Screen.haveScreenshot", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    await actor.attemptsTo(Navigate.to("https://example.com/"));

    expect(
      await actor.asks(Screen.of(page).haveScreenshot("screen-positive.png")),
    ).toBe(true);

    let screenshotRes = false;
    try {
      expect(
        await actor.asks(
          Screen.of(page).haveScreenshot("screen-negative.png", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      screenshotRes = true;
    }
    expect(screenshotRes).toBeTruthy();

    expect(
      await actor.asks(
        Screen.of(page).not.haveScreenshot("screen-negative.png"),
      ),
    ).toBe(true);

    let noteScreenshotRes = false;
    try {
      expect(
        await actor.asks(
          Screen.of(page).not.haveScreenshot("screen-positive.png", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      noteScreenshotRes = true;
    }
    expect(noteScreenshotRes).toBeTruthy();
  });
});
