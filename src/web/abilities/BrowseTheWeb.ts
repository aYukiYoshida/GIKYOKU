import {
  expect,
  BrowserContext,
  ConsoleMessage,
  Cookie,
  Dialog,
  Download,
  FileChooser,
  Frame,
  Locator,
  Page,
  Request,
  Response,
  WebError,
  WebSocket,
  Worker,
} from "@playwright/test";
import { Ability, Actor } from "@testla/screenplay";

import {
  CheckActionOptions,
  ClickActionOptions,
  DblclickActionOptions,
  DragAndDropActionOptions,
  FillActionOptions,
  HoverActionOptions,
  NavigateActionOptions,
  ReloadActionOptions,
  PressActionOptions,
  SelectActionOptions,
  TypeActionOptions,
  WaitForLoadStateActionOptions,
  WaitForUrlActionOptions,
  WaitForLocatorActionOptions,
  WaitForEventActionOptions,
  TextPayload,
  ValuePayload,
  StylePayload,
  CountPayload,
  ScreenshotPayload,
} from "../types";

/**
 * This class represents the actor's ability to use a Browser.
 * This ability enables the actor to interact with the browser and browse web user interfaces.
 *
 * @group Abilities
 */
export class BrowseTheWeb extends Ability {
  /**
   * Initialize this Ability by passing an already existing Playwright Page object.
   *
   * @param {Page} page the Playwright Page that will be used to browse.
   * @return {BrowseTheWeb} Returns the ability to use a browser
   * @category Factory
   */
  public static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /**
   * Use this Ability as an Actor.
   * Required by Actions to get access to the ability functions.
   *
   * @param {Actor} actor Actor is using this ability
   * @return {BrowseTheWeb} Returns the ability to use a browser
   * @category called internally
   */
  public static as(actor: Actor, alias?: string): BrowseTheWeb {
    return actor.withAbilityTo(this, alias) as BrowseTheWeb;
  }

  /**
   * Initialize this Ability by passing an already existing Playwright Page object.
   *
   * @param {Page} page the Playwright Page that will be used to browse.
   */
  private constructor(private page: Page) {
    super();
  }

  /**
   * Get the page object
   *
   * @returns {Page} the playwright page object
   * @category getter
   */
  public getPage(): Page {
    return this.page;
  }

  /**
   * Use the page to navigate to the specified URL.
   *
   * @param {string} url the url to access.
   * @param {NavigateActionOptions} options (optional) options for interaction.
   * @return {Response} Returns the main resource response
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).goto('myURL');
   * ```
   * @category to interact
   */
  public async goto(
    url: string,
    options?: NavigateActionOptions,
  ): Promise<Response | null> {
    return this.page.goto(url, options);
  }

  /**
   * Reload the current page.
   *
   * @param {ReloadActionOptions} options (optional) options for interaction.
   * @return {Response} Returns the main resource response
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).reload();
   * ```
   * @category to interact
   */
  public async reload(options?: ReloadActionOptions): Promise<Response | null> {
    return this.page.reload(options);
  }

  /**
   * Brings page to front to activate it.
   *
   * @return {void}
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).bringToFront(page);
   * ```
   * @category to interact
   */
  public async bringToFront(page: Page): Promise<void> {
    this.page = page;
    return this.page.bringToFront();
  }

  /**
   * Wait for the specified loading state.
   *
   * @param {string} status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
   * @param {WaitForLoadStateActionOptions} options (optional) options for interaction.
   * @return {void} Returns when the required load state has been reached.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).waitForLoadState('networkidle');
   * ```
   * @category to interact
   */
  public async waitForLoadState(
    status: "load" | "domcontentloaded" | "networkidle",
    options?: WaitForLoadStateActionOptions,
  ): Promise<void> {
    return this.page.waitForLoadState(status, options);
  }

  /**
   * Wait for the specified URL.
   *
   * @param {string} url the url to wait for.
   * @param {WaitForUrlActionOptions} options (optional) options for interaction.
   * @return {void} Returns when the page specified url has been reached.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).waitForUrl('example.com');
   * ```
   * @category to interact
   */
  public async waitForUrl(
    url: string | RegExp | ((url: URL) => boolean),
    options?: WaitForUrlActionOptions,
  ): Promise<void> {
    return this.page.waitForURL(url, options);
  }

  /**
   * Wait for the specified event in browser.
   *
   * @param {string} event the event in browser to wait for.
   * @param {WaitForEventActionOptions<BrowserContext | ConsoleMessage| Dialog | Page | Request | Response | WebError | Worker>} options (optional) options for interaction.
   * @return {Promise<BrowserContext | ConsoleMessage| Dialog | Page | Request | Response | WebError | Worker>} Returns the event data value.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).waitForEvent('page');
   * ```
   * @category to interact
   */
  public async waitForEvent(
    event: string,
    options?: WaitForEventActionOptions<
      | BrowserContext
      | ConsoleMessage
      | Dialog
      | Page
      | Request
      | Response
      | WebError
      | Worker
    >,
  ): Promise<
    | BrowserContext
    | ConsoleMessage
    | Dialog
    | Page
    | Request
    | Response
    | WebError
    | Worker
  > {
    switch (event) {
      case "backgroundpage":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Page>;
      case "close":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<BrowserContext>;
      case "console":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<ConsoleMessage>;
      case "dialog":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Dialog>;
      case "page":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Page>;
      case "request":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Request>;
      case "requestfailed":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Request>;
      case "requestfinished":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Request>;
      case "response":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Response>;
      case "serviceworker":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<Worker>;
      case "weberror":
        return this.page
          .context()
          .waitForEvent(event, options) as Promise<WebError>;
      default:
        throw new Error(`Error: event of ${event} is not supported.`);
    }
  }

  /**
   * Wait for the specified event on page.
   *
   * @param {string} event the event on page to wait for.
   * @param {WaitForEventActionOptions<ConsoleMessage|Dialog|Download|Error|FileChooser|Frame|Page|Request|Response|WebSocket|Worker>} options (optional) options for interaction.
   * @return {Promise<ConsoleMessage|Dialog|Download|Error|FileChooser|Frame|Page|Request|Response|WebSocket|Worker>} Returns the event data value.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).waitForEventOnPage('console');
   * ```
   * @category to interact
   */
  public async waitForEventOnPage(
    event: string,
    options?: WaitForEventActionOptions<
      | ConsoleMessage
      | Dialog
      | Download
      | Error
      | FileChooser
      | Frame
      | Page
      | Request
      | Response
      | WebSocket
      | Worker
    >,
  ): Promise<
    | ConsoleMessage
    | Dialog
    | Download
    | Error
    | FileChooser
    | Frame
    | Page
    | Request
    | Response
    | WebSocket
    | Worker
  > {
    switch (event) {
      case "close":
        return this.page.waitForEvent(event, options) as Promise<Page>;
      case "console":
        return this.page.waitForEvent(
          event,
          options,
        ) as Promise<ConsoleMessage>;
      case "crash":
        return this.page.waitForEvent(event, options) as Promise<Page>;
      case "dialog":
        return this.page.waitForEvent(event, options) as Promise<Dialog>;
      case "domcontentloaded":
        return this.page.waitForEvent(event, options) as Promise<Page>;
      case "download":
        return this.page.waitForEvent(event, options) as Promise<Download>;
      case "filechooser":
        return this.page.waitForEvent(event, options) as Promise<FileChooser>;
      case "frameattached":
        return this.page.waitForEvent(event, options) as Promise<Frame>;
      case "framedetached":
        return this.page.waitForEvent(event, options) as Promise<Frame>;
      case "framenavigated":
        return this.page.waitForEvent(event, options) as Promise<Frame>;
      case "load":
        return this.page.waitForEvent(event, options) as Promise<Page>;
      case "pageerror":
        return this.page.waitForEvent(event, options) as Promise<Error>;
      case "popup":
        return this.page.waitForEvent(event, options) as Promise<Page>;
      case "request":
        return this.page.waitForEvent(event, options) as Promise<Request>;
      case "requestfailed":
        return this.page.waitForEvent(event, options) as Promise<Request>;
      case "requestfinished":
        return this.page.waitForEvent(event, options) as Promise<Request>;
      case "response":
        return this.page.waitForEvent(event, options) as Promise<Response>;
      case "websocket":
        return this.page.waitForEvent(event, options) as Promise<WebSocket>;
      case "worker":
        return this.page.waitForEvent(event, options) as Promise<Worker>;
      default:
        throw new Error(`Error: event of ${event} is not supported.`);
    }
  }

  /**
   * Use the page mouse to hover over the specified element.
   *
   * @param {Locator} Locator the locator of the element to hover over.
   * @param {HoverActionOptions} options (optional) options for interaction.
   * @return {void} Returns when hovered over the element
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).hover(page.locator("myLocator"));
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).hover(page.locator("myLocator"), {
   *     modifiers: ['Alt', 'Shift']
   * });
   * ```
   * @category to interact
   */
  public async hover(
    locator: Locator,
    options?: HoverActionOptions,
  ): Promise<void> {
    return locator.hover(options);
  }

  /**
   * Press the specified key(s) on the keyboard.
   *
   * @param {string} input the key(s). multiple keys can be pressed by concatenating with "+"
   * @param {PressActionOptions} options (optional) options for interaction.
   * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
   * @example
   * Press a single button
   * ```ts
   * await BrowseTheWeb.as(actor).press('A');
   * ```
   * Press multiple buttons
   * ```ts
   * await BrowseTheWeb.as(actor).press('Control+A');
   * ```
   * @category to interact
   */
  public async press(
    input: string,
    options?: PressActionOptions,
  ): Promise<void> {
    return this.page.keyboard.press(input, {
      delay: options?.delay,
    });
  }

  /**
   * Press the specified keys sequentially for each string character.
   * To press a special key, like Control or ArrowDown, use {@link press}.
   * @param {Locator} locator the locator of the source element.
   * @param {PressSequentiallyActionOptions} options (optional) options for interaction.
   * @param {string} input string of characters to sequentially press into a focused element
   * @return {void} Returns when the `keys` can specify the intended values or characters to generate the text for.
   * @example
   * simple call with just locator and input value
   * ```ts
   * await BrowseTheWeb.as(actor).pressSequentially('ABC');
   * ```
   * @category to interact
   */
  public async pressSequentially(
    locator: Locator,
    input: string,
    options?: PressActionOptions,
  ): Promise<void> {
    return locator.pressSequentially(input, options);
  }

  /**
   * Check the specified checkbox.
   *
   * @param {Locator} locator the locator of the checkbox.
   * @param {CheckActionOptions} options (optional) options for interaction.
   * @return {void} Returns after checking the element
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkBox(page.locator('myLocator'));
   * ```
   * call with options
   * ```ts
   * await BrowseTheWeb.as(actor)
   *   .checkBox(
   *     page.locator('myLocator'),
   *     { timeout: 1000 }
   *   );
   * ```
   * @category to interact
   */
  public async checkBox(
    locator: Locator,
    options?: CheckActionOptions,
  ): Promise<void> {
    return locator.check(options);
  }

  /**
   * Wait until the element of the specified locator exists.
   *
   * @param {Locator} locator the locator of the element.
   * @param {WaitForLocatorActionOptions} options (optional) options for interaction.
   * @return {void} Returns when the element exists
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).waitForLocator(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).waitForLocator(
   *   page.locator('myLocator'),
   *   { state: "visible" }
   * );
   * ```
   * @category to interact
   */
  public async waitForLocator(
    locator: Locator,
    options?: WaitForLocatorActionOptions,
  ): Promise<void> {
    return locator.waitFor(options);
  }

  /**
   * Drag the specified source element to the specified target element and drop it.
   *
   * @param {Locator} sourceLocator the locator of the source element.
   * @param {Locator} targetLocator the locator of the target element.
   * @param {DragAndDropActionOptions} options (optional) options for interaction.
   * @return {void} Returns after dragging the locator to another target locator or target position
   * @example
   * simple call with just source and target locator
   * ```ts
   * await BrowseTheWeb.as(actor).dragAndDrop(
   *   page.locator('sourceLocator'),
   *   page.locator('targetLocator')
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).dragAndDrop(
   *   page.locator('sourceLocator'),
   *   page.locator('targetLocator'),
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async dragAndDrop(
    sourceLocator: Locator,
    targetLocator: Locator,
    options?: DragAndDropActionOptions,
  ): Promise<void> {
    return sourceLocator.dragTo(targetLocator, options);
  }

  /**
   * Fill the element specified by the locator with the given input.
   *
   * @param {Locator} locator the locator of the source element.
   * @param {string} input the input to fill the element with.
   * @param {FillActionOptions} options (optional) options for interaction.
   * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
   * @example
   * simple call with just locator and input value
   * ```ts
   * await BrowseTheWeb.as(actor).fill(
   *   page.locator('myLocator'),
   *   'myInput'
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).fill(
   *   page.locator('myLocator'),
   *   'myInput',
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async fill(
    locator: Locator,
    input: string,
    options?: FillActionOptions,
  ): Promise<void> {
    return locator.fill(input, options);
  }

  /**
   * Type the given input into the element specified by the locator.
   * @deprecated In most cases, you should use {@link fill} instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use {@link pressSequentially}.
   * @param {Locator} locator the locator of the source element.
   * @param {string} input the input to type into the element.
   * @param {TypeActionOptions} options (optional) options for interaction.
   * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
   * @example
   * simple call with just locator and input value
   * ```ts
   * await BrowseTheWeb.as(actor).type(
   *   page.locator('myLocator'),
   *   'myInput'
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).type(
   *   page.locator('myLocator'),
   *   'myInput',
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async type(
    locator: Locator,
    input: string,
    options?: TypeActionOptions,
  ): Promise<void> {
    return locator.type(input, {
      delay: options?.delay,
      noWaitAfter: options?.noWaitAfter,
      timeout: options?.timeout,
    });
  }

  /**
   * Click the element specified by the locator.
   *
   * @param {Locator} locator the locator of the element to click.
   * @param {ClickActionOptions} options (optional) options for interaction.
   * @return {void} Returns after clicking the element
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).click(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).click(
   *   page.locator('myLocator'),
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async click(
    locator: Locator,
    options?: ClickActionOptions,
  ): Promise<void> {
    return locator.click(options);
  }

  /**
   * Double click the element specified by the locator.
   *
   * @param {Locator} locator the locator of the element to double click.
   * @param {DblclickActionOptions} options (optional) options for interaction.
   * @return {void} Returns after double clicking the element
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).dblclick(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).dblclick(
   *   page.locator('myLocator'),
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async dblclick(
    locator: Locator,
    options?: DblclickActionOptions,
  ): Promise<void> {
    return locator.dblclick(options);
  }

  /**
   * Focus the element specified by the locator.
   *
   * @param {Locator} locator the locator of the element to focus.
   * @param options (optional) options for interaction.
   * @return {void} Returns after focus the element
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).focus(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).focus(
   *   page.locator('myLocator'),
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async focus(
    locator: Locator,
    options?: { timeout?: number },
  ): Promise<void> {
    return locator.focus(options);
  }

  /**
   * Set the value of a Locator of type select to the given option.
   *
   * @param {Locator} locator the string representing the (select) locator.
   * @param values options to select.
   * @param {SelectActionOptions} options (optional) options for interaction.
   * @return {any} Returns the array of option values that have been successfully selected.
   * @example
   * simple call with just locator and input value
   * ```ts
   * await BrowseTheWeb.as(actor).selectOption(
   *   page.locator('myLocator'),
   *   'myOptionLabel'
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).selectOption(
   *   page.locator('myLocator'),
   *   'myOptionLabel'
   *   { timeout: 1000 }
   * );
   * ```
   * @category to interact
   */
  public async selectOption(
    locator: Locator,
    values:
      | string
      | Array<string>
      | {
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }
      | Array<{
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }>,
    options?: SelectActionOptions,
  ): Promise<Array<string>> {
    return locator.selectOption(values, options);
  }

  /**
   * Verify if the page has specified URL.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|RegExp} expectedUrl the expected url of the page.
   * @param options (optional) options for assertion.
   * @param page (optional) the playwright page object to verify.
   * @returns {boolean} Promise<boolean> true if the page has URL as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkPageUrl(
    positive: boolean,
    expectedUrl: string | RegExp,
    options?: { timeout?: number },
    page?: Page,
  ): Promise<boolean> {
    const pageToUse = page ?? this.page;
    if (positive) {
      await expect(pageToUse).toHaveURL(expectedUrl, options);
    } else {
      await expect(pageToUse).not.toHaveURL(expectedUrl, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the page has specified title.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|RegExp} expectedTitle the expected title of the page.
   * @param options (optional) options for assertion.
   * @param page (optional) the playwright page object to verify.
   * @returns {boolean} Promise<boolean> true if the page has title as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkPageTitle(
    positive: boolean,
    expectedTitle: string | RegExp,
    options?: { timeout?: number },
    page?: Page,
  ): Promise<boolean> {
    const pageToUse = page ?? this.page;
    if (positive) {
      await expect(pageToUse).toHaveTitle(expectedTitle, options);
    } else {
      await expect(pageToUse).not.toHaveTitle(expectedTitle, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the page has specified title.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|string[]} name the screenshot name
   * @param options (optional) options for assertion.
   * @param page (optional) the playwright page object to verify.
   * @returns {boolean} Promise<boolean> true if the page has title as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkPageScreenshot(
    positive: boolean,
    name: string | string[],
    options?: { timeout?: number },
    page?: Page,
  ): Promise<boolean> {
    const pageToUse = page ?? this.page;
    if (positive) {
      await expect(pageToUse).toHaveScreenshot(name, options);
    } else {
      await expect(pageToUse).not.toHaveScreenshot(name, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is visible or hidden.
   *
   * @param {Locator} locator the locator to search for.
   * @param {boolean} positive whether to check the visibility of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} Promise<boolean> true if the element is visible/hidden as expected, false if the timeout was reached.
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkVisibilityState(
   *   page.locator('myLocator'),
   *   true
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).checkVisibilityState(
   *   page.locator('myLocator'),
   *   false,
   *   { timeout: 1000 }
   * );
   * ```
   * @category to ensure
   */
  public async checkVisibilityState(
    locator: Locator,
    positive: boolean,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;

      visible?: boolean;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toBeVisible(options);
    } else {
      await expect(locator).toBeHidden({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is enabled or disabled.
   *
   * @param {Locator} locator the locator to search for.
   * @param {boolean} positive whether to check the state of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element is enabled/disabled as expected, false if the timeout was reached.
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkEnabledState(
   *   page.locator('myLocator'),
   *   true
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).checkEnabledState(
   *   page.locator('myLocator'),
   *   false,
   *   { timeout: 1000 }
   * );
   * ```
   * @category to ensure
   */
  public async checkEnabledState(
    locator: Locator,
    positive: boolean,
    options?: {
      enabled?: boolean;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toBeEnabled(options);
    } else {
      await expect(locator).toBeDisabled({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is editable or not.
   *
   * @param {Locator} locator the locator to search for.
   * @param {boolean} positive whether to check the state of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element is editable/not as expected, false if the timeout was reached.
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkEditableState(
   *   page.locator('myLocator'),
   *   true
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).checkEditableState(
   *   page.locator('myLocator'),
   *   false,
   *   { timeout: 1000 }
   * );
   * ```
   * @category to ensure
   */
  public async checkEditableState(
    locator: Locator,
    positive: boolean,
    options?: {
      editable?: boolean;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toBeEditable(options);
    } else {
      await expect(locator).not.toBeEditable(options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is focused or not.
   *
   * @param {Locator} locator the locator to search for.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element is editable/not as expected, false if the timeout was reached.
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkFocusedState(
   *   page.locator('myLocator'),
   *   true
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).checkFocusedState(
   *   page.locator('myLocator'),
   *   false,
   *   { timeout: 1000 }
   * );
   * ```
   * @category to ensure
   */
  public async checkFocusedState(
    locator: Locator,
    positive: boolean,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toBeFocused(options);
    } else {
      await expect(locator).not.toBeFocused(options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element is checked.
   *
   * @param {Locator} locator the locator of the element.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options
   * @returns {boolean} true if the element is checked/not as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkCheckedState(
    locator: Locator,
    positive: boolean,
    options?: {
      checked?: boolean;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toBeChecked(options);
    } else {
      await expect(locator).not.toBeChecked(options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator points to an element that intersects viewport
   *
   * @param {Locator} locator the locator to search for.
   * @param {boolean} positive whether to check the visibility of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} Promise<boolean> true if the element is displayed as expected, false if the timeout was reached.
   * @example
   * simple call with just locator
   * ```ts
   * await BrowseTheWeb.as(actor).checkDisplayState(
   *   page.locator('myLocator'),
   *   true
   * );
   * ```
   * with options
   * ```ts
   * await BrowseTheWeb.as(actor).checkDisplayState(
   *   page.locator('myLocator'),
   *   false,
   *   { timeout: 1000 }
   * );
   * ```
   * @category to ensure
   */
  public async checkLocatorInViewportState(
    locator: Locator,
    positive: boolean,
    options?: {
      /**
       * The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at any positive ratio. Defaults to `0`.
       */
      ratio?: number;
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      // Make sure at least some part of element intersects viewport.
      await expect(locator).toBeInViewport(options);
    } else {
      // Make sure element is fully outside of viewport.
      await expect(locator).not.toBeInViewport(options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element has the given text or not.
   *
   * @param {Locator} locator the locator of the element to hover over.
   * @param {string | RegExp | (string | RegExp)[]} text the text to check.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options options for assertion.
   * @returns {boolean} true if the element has text/not as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkLocatorHasText(
    locator: Locator,
    text: TextPayload,
    positive: boolean,
    options?: {
      /**
       * Whether to perform case-insensitive match. `ignoreCase` option takes precedence over the corresponding regular
       * expression flag if specified.
       */
      ignoreCase?: boolean;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;

      /**
       * Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.
       */
      useInnerText?: boolean;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toHaveText(text, options);
    } else {
      await expect(locator).not.toHaveText(text, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element contains the given text or not.
   *
   * @param {Locator} locator the locator of the element to hover over.
   * @param {TextPayload} text the text to check.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @category to ensure
   */
  public async checkLocatorContainsText(
    locator: Locator,
    text: TextPayload,
    positive: boolean,
    options?: {
      /**
       * Whether to perform case-insensitive match. `ignoreCase` option takes precedence over the corresponding regular
       * expression flag if specified.
       */
      ignoreCase?: boolean;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;

      /**
       * Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.
       */
      useInnerText?: boolean;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toContainText(text, options);
    } else {
      await expect(locator).not.toContainText(text, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element has the given input value or not.
   *
   * @param {Locator} locator the locator of the element to hover over.
   * @param {ValuePayload} value the single value to check.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element has value/not as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkLocatorHasValue(
    locator: Locator,
    value: ValuePayload,
    positive: boolean,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toHaveValue(value, options);
    } else {
      await expect(locator).not.toHaveValue(value, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the element has exact number of DOM node.
   *
   * @param {Locator} locator the locator of the element.
   * @param {CountPayload} count the minimum count of the element to be visible.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element has exact number of DOM node, false if the timeout was reached.
   * @category to ensure
   */
  public async checkLocatorHasCount(
    locator: Locator,
    count: CountPayload,
    positive: boolean,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toHaveCount(count, options);
    } else {
      await expect(locator).not.toHaveCount(count, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element has the given CSS or not.
   *
   * @param {Locator} locator the locator of the element to hover over.
   * @param {StylePayload} style the style name and value to check.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element has CSS/not as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkLocatorHasCSS(
    locator: Locator,
    style: StylePayload,
    positive: boolean,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toHaveCSS(style.name, style.value, options);
    } else {
      await expect(locator).not.toHaveCSS(style.name, style.value, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if the given element has the given screenshot or not.
   *
   * @param {Locator} locator the locator of the element to hover over.
   * @param {ScreenshotPayload} name the screenshot name.
   * @param {boolean} positive whether to check the property of the locator positive or not.
   * @param options (optional) options for assertion.
   * @returns {boolean} true if the element has screenshot/not as expected, false if the timeout was reached.
   * @category to ensure
   */
  public async checkLocatorHasScreenshot(
    locator: Locator,
    name: ScreenshotPayload,
    positive: boolean,
    options?: {
      /**
       * When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different
       * treatment depending on their duration:
       * - finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
       * - infinite animations are canceled to initial state, and then played over after the screenshot.
       *
       * Defaults to `"disabled"` that disables animations.
       */
      animations?: "disabled" | "allow";

      /**
       * When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be
       * changed.  Defaults to `"hide"`.
       */
      caret?: "hide" | "initial";

      /**
       * Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink
       * box `#FF00FF` (customized by `maskColor`) that completely covers its bounding box.
       */
      mask?: Array<Locator>;

      /**
       * Specify the color of the overlay box for masked elements, in
       * [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
       */
      maskColor?: string;

      /**
       * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
       * configurable with `TestConfig.expect`. Unset by default.
       */
      maxDiffPixelRatio?: number;

      /**
       * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
       * default.
       */
      maxDiffPixels?: number;

      /**
       * Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
       * Defaults to `false`.
       */
      omitBackground?: boolean;

      /**
       * When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this
       * will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so
       * screenshots of high-dpi devices will be twice as large or even larger.
       *
       * Defaults to `"css"`.
       */
      scale?: "css" | "device";

      /**
       * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
       * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
       * `TestConfig.expect`. Defaults to `0.2`.
       */
      threshold?: number;

      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Promise<boolean> {
    if (positive) {
      await expect(locator).toHaveScreenshot(name, options);
    } else {
      await expect(locator).not.toHaveScreenshot(name, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.
   * @param {string|string[]} urls affected urls
   * @return {Cookie[]} Returns the cookies of the current browser context.
   * @example
   * get all cookies
   * ```ts
   * await BrowseTheWeb.as(actor).getCookies();
   * ```
   * get cookies for one single domain
   * ```ts
   * await BrowseTheWeb.as(actor).getCookies('https://example.com');
   * ```
   * get cookies for two domains
   * ```ts
   * await BrowseTheWeb.as(actor).getCookies(['https://example.com', 'https://www.com']);
   * ```
   * @category related to cookies
   */
  public async getCookies(urls?: string | string[]): Promise<Cookie[]> {
    return this.page.context().cookies(urls);
  }

  /**
   * Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).
   * @param {Cookie[]} cookies Cookies to add at browser context
   * @return {void} Returns after adding cookies into this browser context.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).addCookies([{
   *   name: 'my cookie',
   *   value: 'my value',
   *   url: 'http://www.myapp.com',
   * }]);
   * ```
   * @category related to cookies
   */
  public async addCookies(cookies: Cookie[]): Promise<void> {
    return this.page.context().addCookies(cookies);
  }

  /**
   * Clear the browser context cookies.
   * @return {void} Clears context cookies.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).clearCookies();
   * ```
   * @category related to cookies
   */
  public async clearCookies(): Promise<void> {
    return this.page.context().clearCookies();
  }

  /**
   * Get a local storage item specified by the given key.
   *
   * @param {string} key the key that specifies the item.
   * @return {any} Returns the local storage item
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).getLocalStorageItem('some key');
   * ```
   * @category related to storage
   */
  public async getLocalStorageItem(key: string): Promise<any> {
    return this.page.evaluate((k) => {
      const value = localStorage.getItem(k);
      if (value) {
        return Promise.resolve(JSON.parse(value));
      }
      return Promise.resolve(undefined);
    }, key);
  }

  /**
   * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
   *
   * @param {string} key the key that specifies the item.
   * @param {any} value the value to set.
   * @return {void} Returns after adding the local storage item
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).setLocalStorageItem('some key', 'some value');
   * ```
   * @category related to storage
   */
  public async setLocalStorageItem(key: string, value: any): Promise<void> {
    return this.page.evaluate(
      ({ k, v }) => {
        localStorage.setItem(k, JSON.stringify(v));
        return Promise.resolve();
      },
      { k: key, v: value },
    );
  }

  /**
   * Delete a local storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {void} Returns after deleting a local storage item
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).removeLocalStorageItem('some key');
   * ```
   * @category related to storage
   */
  public async removeLocalStorageItem(key: string): Promise<void> {
    return this.page.evaluate((k) => {
      localStorage.removeItem(k);
      return Promise.resolve();
    }, key);
  }

  /**
   * Get a session storage item specified by given key.
   *
   * @param {string} key the key that specifies the item.
   * @return {any} Retrieves a session storage item
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).getSessionStorageItem('some key');
   * ```
   * @category related to storage
   */
  public async getSessionStorageItem(key: string): Promise<any> {
    return this.page.evaluate((k) => {
      const value = sessionStorage.getItem(k);
      if (value) {
        return Promise.resolve(JSON.parse(value));
      }
      return Promise.resolve(undefined);
    }, key);
  }

  /**
   * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
   *
   * @param {string} key the key that specifies the item.
   * @param {any} value the value to set.
   * @return {void} Set the session storage item
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).setSessionStorageItem('some key', 'some value');
   * ```
   * @category related to storage
   */
  public async setSessionStorageItem(key: string, value: any): Promise<void> {
    return this.page.evaluate(
      ({ k, v }) => {
        sessionStorage.setItem(k, JSON.stringify(v));
        return Promise.resolve();
      },
      { k: key, v: value },
    );
  }

  /**
   * Delete a session storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {void} Returns after removing a session storage item.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).removeSessionStorageItem('some key');
   * ```
   * @category related to storage
   */
  public async removeSessionStorageItem(key: string): Promise<void> {
    return this.page.evaluate((k) => {
      sessionStorage.removeItem(k);
      return Promise.resolve();
    }, key);
  }

  /**
   * Save storage state for this browser context, contains current cookies and local storage snapshot.
   *
   * @param {string} path The file path to save the storage state to.
   * @return {Object} Returns storage state.
   * @example
   * ```ts
   * await BrowseTheWeb.as(actor).removeSessionStorageItem('some key');
   * ```
   * @category related to storage
   */
  public async saveStorageState(path: string): Promise<Object> {
    return this.page.context().storageState({ path });
  }
}
