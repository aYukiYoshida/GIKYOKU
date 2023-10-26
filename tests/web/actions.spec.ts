/* eslint-disable no-restricted-syntax */

import fs from "fs";

import {
  BrowseTheWeb,
  Add,
  Bring,
  Check,
  Clear,
  Click,
  DoubleClick,
  DragAndDrop,
  Fill,
  Focus,
  Get,
  Hover,
  Navigate,
  Press,
  Remove,
  Save,
  Select,
  Set,
  Type,
  Wait,
  Reload,
  Screen,
} from "@g5u/web";
import {
  BrowserContext,
  Cookie,
  Page,
  expect,
  test as base,
} from "@playwright/test";
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

test.describe("Web Actions", () => {
  test("Navigate", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    await actor.attemptsTo(Navigate.to("https://google.com"));
    await expect(page).toHaveURL("https://www.google.com");
  });

  test("Reload", async ({ actor }) => {
    // To get access of the page object
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/add_remove_elements/"),
      Wait.forLoadState("networkidle"),
    );

    await expect(page.locator('[class="added-manually"]')).toHaveCount(0);

    await actor.attemptsTo(
      Click.on(page.locator("button", { hasText: "Add Element" })),
    );

    await expect(page.locator('[class="added-manually"]')).toHaveCount(1);

    await actor.attemptsTo(Reload.page());

    await expect(page.locator('[class="added-manually"]')).toHaveCount(0);
  });

  test("Bring", async ({ actor }) => {
    // To get access of the page object
    const page: Page = BrowseTheWeb.as(actor).getPage();
    const newPagePromise: Promise<Page> = page.context().waitForEvent("page");

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/windows"),
      Wait.forLoadState("networkidle"),
    );
    await actor.asks(
      Screen.does.haveUrl("https://the-internet.herokuapp.com/windows"),
    );

    await actor.attemptsTo(
      Click.on(page.getByRole("link", { name: "Click Here" })),
    );
    const newPage: Page = await newPagePromise;
    await actor.attemptsTo(
      Bring.toFront(newPage),
      Wait.forLoadState("networkidle"),
    );
    await actor.asks(
      Screen.does.haveUrl("https://the-internet.herokuapp.com/windows/new"),
    );

    await actor.attemptsTo(
      Bring.toFront(page),
      Wait.forLoadState("networkidle"),
    );
    await actor.asks(
      Screen.does.haveUrl("https://the-internet.herokuapp.com/windows"),
    );
  });

  test("DragAndDrop", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/drag_and_drop"),
      Wait.forLoadState("networkidle"),
    );

    // before drag: Box A is on the Left
    await expect(page.locator('[id="column-a"] header')).toHaveText("A");

    // execute the drag
    await actor.attemptsTo(
      DragAndDrop.execute(
        page.locator('[id="column-a"]'),
        page.locator('[id="column-b"]'),
      ),
    );
    // after Drag: Box B is on the Left
    await expect(page.locator('[id="column-a"] header')).toHaveText("B");
  });

  test("Check", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/checkboxes"),
      Wait.forLoadState("networkidle"),
      Check.element(page.locator("//input[1]")),
      Check.element(page.locator("//input[2]")),
    );
    // assertion
    await expect(page.locator("//input[1]")).toBeChecked();
    await expect(page.locator("//input[2]")).toBeChecked();
  });

  test("Click", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/add_remove_elements/"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is no button before we add it with our Click
    await expect(page.locator('[class="added-manually"]')).toHaveCount(0);

    await actor.attemptsTo(
      Click.on(page.locator("button", { hasText: "Add Element" })),
    );
    // assert that the button is here after our Click
    await expect(page.locator('[class="added-manually"]')).toHaveCount(1);
  });

  test("DoubleClick", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/checkboxes"),
      Wait.forLoadState("networkidle"),
    );
    // assert that checkbox is checked before we click it at twice.
    await expect(page.locator("//input[2]")).toBeChecked();

    await actor.attemptsTo(DoubleClick.on(page.locator("//input[2]")));
    // assert that the checkbox is checked after we click it at twice
    await expect(page.locator("//input[2]")).toBeChecked();
  });

  test("Fill", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );

    // assert that text boxes are empty before we fill it.
    await expect(page.locator('[id="username"]')).toHaveText("");
    await expect(page.locator('[id="password"]')).toHaveText("");

    await actor.attemptsTo(
      Fill.in(page.locator('[id="username"]'), "tomsmith"),
      Fill.in(page.locator('[id="password"]'), "SuperSecretPassword!"),
      Click.on(page.locator('[class="radius"]')),
      Wait.forLoadState("networkidle"),
    );
    // assert that the login worked
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Type", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );
    // assert that text boxes are empty before we fill it.
    await expect(page.locator('[id="username"]')).toHaveText("");
    await expect(page.locator('[id="password"]')).toHaveText("");

    await actor.attemptsTo(
      Type.in(page.locator('[id="username"]'), "tomsmith"),
      Type.in(page.locator('[id="password"]'), "Super"),
      Type.in(page.locator('[id="password"]'), "Secret"),
      Type.in(page.locator('[id="password"]'), "Password"),
      Type.in(page.locator('[id="password"]'), "!"),
      Click.on(page.locator('[class="radius"]')),
      Wait.forLoadState("networkidle"),
    );
    // assert that the login worked
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Hover", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/hovers"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is no info before the hover
    await expect(page.locator('[href="/users/1"]')).not.toBeVisible();

    await actor.attemptsTo(
      Hover.over(page.locator("div.figure:nth-child(3) > img:nth-child(1)")),
    );
    // assert that the info is now visible after hover
    await expect(page.locator('[href="/users/1"]')).toBeVisible();
  });

  test.describe("Press", () => {
    test("single key", async ({ actor }) => {
      const page: Page = BrowseTheWeb.as(actor).getPage();

      await actor.attemptsTo(
        Navigate.to("https://the-internet.herokuapp.com/key_presses"),
        Wait.forLoadState("networkidle"),
      );
      // assert that there is nothing in the result box
      await expect(page.locator('[id="result"]')).toHaveText("");

      await actor.attemptsTo(
        Click.on(page.locator('[id="target"]')),
        Press.key("a"),
      );
      // assert that the pressed button was recognized
      await expect(page.locator('[id="result"]')).toHaveText("You entered: A");
    });

    test("multiple keys", async ({ actor }) => {
      const page: Page = BrowseTheWeb.as(actor).getPage();

      await actor.attemptsTo(
        Navigate.to("https://the-internet.herokuapp.com/login"),
        Wait.forLoadState("networkidle"),
      );
      // assert that checkbox is checked before we click it at twice.
      await expect(page.locator('[id="username"]')).toHaveText("");
      await expect(page.locator('[id="password"]')).toHaveText("");

      await actor.attemptsTo(
        Press.characters(page.locator('[id="username"]'), "tomsmith"),
        Press.characters(page.locator('[id="password"]'), "Super"),
        Press.characters(page.locator('[id="password"]'), "Secret"),
        Press.characters(page.locator('[id="password"]'), "Password"),
        Press.characters(page.locator('[id="password"]'), "!"),
        Click.on(page.locator('[class="radius"]')),
        Wait.forLoadState("networkidle"),
      );
      // assert that the login worked
      await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    });
  });

  test("Select", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/dropdown"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is nothing in the dropdown
    await expect(page.locator('[id="dropdown"]')).toHaveValue("");

    await actor.attemptsTo(
      Select.option(page.locator('[id="dropdown"]'), "Option 1"),
    );
    // assert that the pressed button was recognized
    await expect(page.locator('[id="dropdown"]')).toHaveValue("1");
  });

  test("Focus", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );
    // assert that the username text box is not focused
    await expect(page.locator('[id="username"]')).not.toBeFocused();

    await actor.attemptsTo(Focus.on(page.locator('[id="username"]')));
    // assert that the pressed button was recognized
    await expect(page.locator('[id="username"]')).toBeFocused();
  });

  test("Wait + Recursive Locators", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),

      // Locator@[id="table1"] >> tbody tr >> internal:has="text=Conway" >> td:has-text("$50.00")
      // Wait.forSelector(page.locator('[id="table1"]'), { subSelector: [('tbody tr'), { hasText: 'Conway', subSelector: [('td:has-text("$50.00")')] }] }),
      Wait.forLocator(
        page.locator('[id="table1"]', {
          has: page.locator("tbody tr", {
            has: page.locator('td:has-text("$50.00")'),
            hasText: "Conway",
          }),
        }),
      ),
    );
  });

  test("Wait for URL", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();

    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/redirector"),
      Wait.forLoadState("networkidle"),
      Click.on(page.getByRole("link", { name: "here" })),
      Wait.forUrl("https://the-internet.herokuapp.com/status_codes", {
        waitUntil: "networkidle",
      }),
    );
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/status_codes",
    );
  });

  test("Cookies: Add, Get, Clear", async ({ actor }) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    const context: BrowserContext = page.context();

    await actor.attemptsTo(
      Navigate.to("https://google.com"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there are cookies to clear
    expect(await context.cookies()).not.toStrictEqual([]);

    // Clear any cookies not added by us
    await actor.attemptsTo(Clear.cookies());

    // assert that cookies are successfully cleared
    expect(await context.cookies()).toStrictEqual([]);

    // Add some cookies
    const cookiesToAdd: Cookie[] = [
      {
        name: "cookie1",
        value: "someValue",
        domain: ".google.com",
        path: "/",
        expires: 1700269944,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
      {
        name: "cookie2",
        value: "val",
        domain: ".google.com",
        path: "/",
        expires: 1700269944,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    ];
    await actor.attemptsTo(Add.cookies(cookiesToAdd));
    // assert that cookies are successfully added
    expect(await context.cookies()).toStrictEqual(cookiesToAdd);

    // Get the cookies we just added
    const getCookies: Cookie[] = await actor.attemptsTo(
      Get.cookies("https://google.com"),
    );
    // assert that cookies are retrieved successfully
    expect(getCookies).toStrictEqual(cookiesToAdd);
  });

  test("Local storage + Session storage", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://google.com"),
      Wait.forLoadState("networkidle"),

      Set.localStorageItem("localKey", "localValue"),
      Set.sessionStorageItem("sessionKey", "sessionValue"),
    );

    // check local storage item
    const local = await actor.attemptsTo(Get.localStorageItem("localKey"));
    expect(local).toBe("localValue");

    // check session storage item
    const session = await actor.attemptsTo(
      Get.sessionStorageItem("sessionKey"),
    );
    expect(session).toBe("sessionValue");

    // check for values that are not there
    const localUndefined = await actor.attemptsTo(Get.localStorageItem("???"));
    expect(localUndefined).toBeUndefined();

    // check for values that are not there
    const sessionUndefined = await actor.attemptsTo(
      Get.sessionStorageItem("???"),
    );
    expect(sessionUndefined).toBeUndefined();

    // remove local storage item and verify that it was deleted
    const localDeleted = await actor.attemptsTo(
      Remove.localStorageItem("localKey"),
      Get.localStorageItem("localKey"),
    );
    expect(localDeleted).toBeUndefined();

    // remove session storage item and verify that it was deleted
    const sessionDeleted = await actor.attemptsTo(
      Remove.sessionStorageItem("sessionKey"),
      Get.sessionStorageItem("sessionKey"),
    );
    expect(sessionDeleted).toBeUndefined();
  });

  test("Save", async ({ actor }, testInfo) => {
    const page: Page = BrowseTheWeb.as(actor).getPage();
    const context: BrowserContext = page.context();

    expect(await context.cookies()).toStrictEqual([]);

    const cookies: Cookie[] = [
      {
        name: "cookie1",
        value: "someValue",
        domain: ".google.com",
        path: "/",
        expires: 1700269944,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
      {
        name: "cookie2",
        value: "val",
        domain: ".google.com",
        path: "/",
        expires: 1700269944,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    ];
    await actor.attemptsTo(Add.cookies(cookies));
    expect(await context.cookies()).toStrictEqual(cookies);

    await actor.attemptsTo(
      Save.storageState(testInfo.outputPath("storage-state.json")),
    );
    const savedStorageState = JSON.parse(
      fs.readFileSync(testInfo.outputPath("storage-state.json"), "utf8"),
    );

    // assert that storage state is saved successfully
    expect(await context.storageState()).toStrictEqual(savedStorageState);
  });
});
