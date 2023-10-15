/* eslint-disable no-restricted-syntax */

import {
  BrowseTheWeb,
  Add,
  Check,
  Clear,
  Click,
  DoubleClick,
  DragAndDrop,
  Fill,
  Get,
  Hover,
  Navigate,
  Press,
  Remove,
  Select,
  Set,
  Type,
  Wait,
  Element,
  Screen,
} from "@g5u/web";
import { BrowserContext, Cookie, expect, test as base } from "@playwright/test";
import { Actor } from "@testla/screenplay";

type MyActors = {
  actor: Actor;
};

const test = base.extend<MyActors>({
  actor: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const actor = Actor.named("TestActor")
      .can(BrowseTheWeb.using(page))
      .with("page", page);
    await use(actor);
  },
});

test.describe("Testing g5u web module", () => {
  test("Navigate", async ({ actor }) => {
    // To get access of the page object
    // const page: Page = BrowseTheWeb.as(actor).getPage();

    // await page.coverage.startJSCoverage();
    await test.step("Navigate to playwright page", async () => {
      await actor.attemptsTo(Navigate.to("https://google.com"));
      await expect(actor.states("page")).toHaveURL("https://www.google.com");
    });
    // const coverage = await page.coverage.stopJSCoverage();
    // let coverageInformation = '';
    // for (const entry of coverage) {
    //     const converter = v8toIstanbul('', 0, { source: entry.source! });
    //     // eslint-disable-next-line no-await-in-loop
    //     await converter.load();
    //     converter.applyCoverage(entry.functions);
    //     // console.log(JSON.stringify(converter.toIstanbul()));
    //     coverageInformation += JSON.stringify(converter.toIstanbul());
    // }

    // fs.writeFile('testCoverage.json', coverageInformation, (err) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log('JSON data is saved.');
    // });
  });

  test("DragAndDrop", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/drag_and_drop"),
      Wait.forLoadState("networkidle"),
    );

    // before drag: Box A is on the Left
    await expect(
      actor.states("page").locator('[id="column-a"] header'),
    ).toHaveText("A");

    // execute the drag
    await actor.attemptsTo(
      DragAndDrop.execute('[id="column-a"]', '[id="column-b"]'),
    );
    // after Drag: Box B is on the Left
    await expect(
      actor.states("page").locator('[id="column-a"] header'),
    ).toHaveText("B");
  });

  test("Check", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/checkboxes"),
      Wait.forLoadState("networkidle"),
      Check.element("//input[1]"),
      Check.element("//input[2]"),
    );
    // assertion
    await expect(actor.states("page").locator("//input[1]")).toBeChecked();
    await expect(actor.states("page").locator("//input[2]")).toBeChecked();
  });

  test("Click", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/add_remove_elements/"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is no button before we add it with our Click
    await expect(
      actor.states("page").locator('[class="added-manually"]'),
    ).toHaveCount(0);

    await actor.attemptsTo(Click.on("button", { hasText: "Add Element" }));
    // assert that the button is here after our Click
    await expect(
      actor.states("page").locator('[class="added-manually"]'),
    ).toHaveCount(1);
  });

  test("DoubleClick", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/checkboxes"),
      Wait.forLoadState("networkidle"),
    );
    // assert that checkbox is checked before we click it at twice.
    await expect(actor.states("page").locator("//input[2]")).toBeChecked();

    await actor.attemptsTo(DoubleClick.on("//input[2]"));
    // assert that the checkbox is checked after we click it at twice
    await expect(actor.states("page").locator("//input[2]")).toBeChecked();
  });

  test("Fill", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );
    // assert that text boxes are empty before we fill it.
    await expect(actor.states("page").locator('[id="username"]')).toHaveText(
      "",
    );
    await expect(actor.states("page").locator('[id="password"]')).toHaveText(
      "",
    );
    await actor.attemptsTo(
      Fill.in('[id="username"]', "tomsmith"),
      Fill.in('[id="password"]', "SuperSecretPassword!"),
      Click.on('[class="radius"]'),
      Wait.forLoadState("networkidle"),
    );
    // assert that the login worked
    await expect(actor.states("page")).toHaveURL(
      "https://the-internet.herokuapp.com/secure",
    );
  });

  test("Type", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );
    // assert that text boxes are empty before we fill it.
    await expect(actor.states("page").locator('[id="username"]')).toHaveText(
      "",
    );
    await expect(actor.states("page").locator('[id="password"]')).toHaveText(
      "",
    );

    await actor.attemptsTo(
      Type.in('[id="username"]', "tomsmith"),
      Type.in('[id="password"]', "Super"),
      Type.in('[id="password"]', "Secret"),
      Type.in('[id="password"]', "Password"),
      Type.in('[id="password"]', "!"),
      Click.on('[class="radius"]'),
      Wait.forLoadState("networkidle"),
    );
    // assert that the login worked
    await expect(actor.states("page")).toHaveURL(
      "https://the-internet.herokuapp.com/secure",
    );
  });

  test("Hover", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/hovers"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is no info before the hover
    await expect(
      actor.states("page").locator('[href="/users/1"]'),
    ).not.toBeVisible();

    await actor.attemptsTo(
      Hover.over("div.figure:nth-child(3) > img:nth-child(1)"),
    );
    // assert that the info is now visible after hover
    await expect(
      actor.states("page").locator('[href="/users/1"]'),
    ).toBeVisible();
  });

  test.describe("Press", () => {
    test("single key", async ({ actor }) => {
      await actor.attemptsTo(
        Navigate.to("https://the-internet.herokuapp.com/key_presses"),
        Wait.forLoadState("networkidle"),
      );
      // assert that there is nothing in the result box
      await expect(actor.states("page").locator('[id="result"]')).toHaveText(
        "",
      );

      await actor.attemptsTo(Click.on('[id="target"]'), Press.key("a"));
      // assert that the pressed button was recognized
      await expect(actor.states("page").locator('[id="result"]')).toHaveText(
        "You entered: A",
      );
    });

    test("multiple keys", async ({ actor }) => {
      await actor.attemptsTo(
        Navigate.to("https://the-internet.herokuapp.com/login"),
        Wait.forLoadState("networkidle"),
      );
      // assert that checkbox is checked before we click it at twice.
      await expect(actor.states("page").locator('[id="username"]')).toHaveText(
        "",
      );
      await expect(actor.states("page").locator('[id="password"]')).toHaveText(
        "",
      );

      await actor.attemptsTo(
        Press.characters('[id="username"]', "tomsmith"),
        Press.characters('[id="password"]', "Super"),
        Press.characters('[id="password"]', "Secret"),
        Press.characters('[id="password"]', "Password"),
        Press.characters('[id="password"]', "!"),
        Click.on('[class="radius"]'),
        Wait.forLoadState("networkidle"),
      );
      // assert that the login worked
      await expect(actor.states("page")).toHaveURL(
        "https://the-internet.herokuapp.com/secure",
      );
    });
  });

  test("Select", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/dropdown"),
      Wait.forLoadState("networkidle"),
    );
    // assert that there is nothing in the dropdown
    await expect(actor.states("page").locator('[id="dropdown"]')).toHaveValue(
      "",
    );

    await actor.attemptsTo(Select.option('[id="dropdown"]', "Option 1"));
    // assert that the pressed button was recognized
    await expect(actor.states("page").locator('[id="dropdown"]')).toHaveValue(
      "1",
    );
  });

  test("Wait + Recursive Locators", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),

      Wait.forSelector('[id="table1"]', {
        subSelector: [
          "tbody tr",
          { hasText: "Conway", subSelector: ['td:has-text("$50.00")'] },
        ],
      }),
    );
  });

  test("Cookies: Add, Get, Clear", async ({ actor }) => {
    const context: BrowserContext = actor.states("page").context();

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

  test("Element.visible", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),
    );

    expect(
      await actor.asks(Element.of("h3", { hasText: "Data Tables" }).visible()),
    ).toBe(true);

    let visibleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of("h3", {
            hasText: "this does not exist",
            timeout: 1000,
          }).visible(),
        ),
      ).toBe(true);
    } catch (error) {
      visibleRes = true;
    }
    expect(visibleRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of("h3", { hasText: "this does not exist" }).not.visible(),
      ),
    ).toBe(true);

    let notVisibleRes = false;
    try {
      expect(
        await actor.asks(
          Element.of("h3", {
            hasText: "Data Tables",
            timeout: 1000,
          }).not.visible(),
        ),
      ).toBe(true);
    } catch (error) {
      notVisibleRes = true;
    }
    expect(notVisibleRes).toBeTruthy();
  });

  test("Element.enabled", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tinymce"),
      Wait.forLoadState("networkidle"),
      Click.on('[aria-label="Bold"]'),
    );

    expect(await actor.asks(Element.of('[aria-label="Undo"]').enabled())).toBe(
      true,
    );

    let enabledRes = false;
    try {
      expect(
        await actor.asks(
          Element.of('[aria-label="Redo"]', { timeout: 1000 }).enabled(),
        ),
      ).toBe(true);
    } catch (error) {
      enabledRes = true;
    }
    expect(enabledRes).toBeTruthy();

    expect(
      await actor.asks(Element.of('[aria-label="Redo"]').not.enabled()),
    ).toBe(true);

    let notEnabledRes = false;
    try {
      expect(
        await actor.asks(
          Element.of('[aria-label="Undo"]', { timeout: 1000 }).not.enabled(),
        ),
      ).toBe(true);
    } catch (error) {
      notEnabledRes = true;
    }
    expect(notEnabledRes).toBeTruthy();
  });

  test("Element.text", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/tables"),
      Wait.forLoadState("networkidle"),
    );

    expect(await actor.asks(Element.of("h3").haveText("Data Tables"))).toBe(
      true,
    );

    let textRes = false;
    try {
      expect(
        await actor.asks(
          Element.of("h3", {
            timeout: 1000,
          }).haveText("this text does not exist"),
        ),
      ).toBe(true);
    } catch (error) {
      textRes = true;
    }
    expect(textRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of("h3").not.haveText(/[0-9]/), // RegExp that does not exist
      ),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of("h3", { timeout: 1000 }).not.haveText(["Data Tables"]),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Element.values", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("https://the-internet.herokuapp.com/login"),
      Wait.forLoadState("networkidle"),
    );

    // fill username field with string
    await actor.attemptsTo(Fill.in('[id="username"]', "test"));
    // toBe.value test: expect the value of the username field to be the string 'test'
    expect(
      await actor.asks(Element.of('[id="username"]').haveValue("test")),
    ).toBe(true);

    // toBe.value test: expect the question to fail if the expected string is not correct
    let textRes = false;
    try {
      expect(
        await actor.asks(
          Element.of('[id="username"]', {
            timeout: 1000,
          }).haveValue("this value is wrong"),
        ),
      ).toBe(true);
    } catch (error) {
      textRes = true;
    }
    expect(textRes).toBeTruthy();

    expect(
      await actor.asks(
        Element.of('[id="username"]').not.haveValue("this value is wrong"),
      ),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Element.of('[id="username"]', { timeout: 1000 }).not.haveValue(
            /test/,
          ), // RegExp for the string 'test'
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Screen.url", async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("https://google.com"));

    expect(
      await actor.asks(Screen.does.haveUrl("https://www.google.com/")),
    ).toBe(true);

    // toHave.url test: expect the question to fail if the expected url is not correct
    let urlRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.haveUrl("https://www.google.co.jp/", { timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      urlRes = true;
    }
    expect(urlRes).toBeTruthy();

    expect(
      await actor.asks(Screen.does.not.haveUrl("https://www.google.co.jp/")),
    ).toBe(true);

    let notTextRes = false;
    try {
      expect(
        await actor.asks(
          Screen.does.not.haveUrl("https://www.google.com/", { timeout: 1000 }),
        ),
      ).toBe(true);
    } catch (error) {
      notTextRes = true;
    }
    expect(notTextRes).toBeTruthy();
  });

  test("Screen.title", async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("https://google.com"));

    expect(
      await actor.asks(Screen.of(actor.states("page")).haveTitle("Google")),
    ).toBe(true);

    // toHave.title test: expect the question to fail if the expected title is not correct
    let titleRes = false;
    try {
      expect(
        await actor.asks(
          Screen.of(actor.states("page")).haveTitle("GIKYOKU", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      titleRes = true;
    }
    expect(titleRes).toBeTruthy();

    expect(
      await actor.asks(
        Screen.of(actor.states("page")).not.haveTitle("GIKYOKU"),
      ),
    ).toBe(true);

    let notTitleRes = false;
    try {
      expect(
        await actor.asks(
          Screen.of(actor.states("page")).not.haveTitle("Google", {
            timeout: 1000,
          }),
        ),
      ).toBe(true);
    } catch (error) {
      notTitleRes = true;
    }
    expect(notTitleRes).toBeTruthy();
  });
});
