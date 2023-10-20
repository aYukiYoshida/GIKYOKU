import { Cookie, expect, Locator, Page, Response } from "@playwright/test";
import { Ability, Actor } from "@testla/screenplay";

import {
  Selector,
  SelectorOptions,
  ScreenOptions,
  CheckActionOptions,
  ClickActionOptions,
  DblclickActionOptions,
  DragAndDropActionOptions,
  FillActionOptions,
  HoverActionOptions,
  NavigateActionOptions,
  PressActionOptions,
  SelectActionOptions,
  TypeActionOptions,
  WaitActionOptions,
  TextPayload,
  ValuePayload,
  StylePayload,
  CountPayload,
  ScreenshotPayload,
} from "../types";
import { recursiveLocatorLookup } from "../utils";

/**
 * @group Abilities
 *
 * This class represents the actor's ability to use a Browser.
 * This ability enables the actor to interact with the browser and browse web user interfaces.
 */
export class BrowseTheWeb extends Ability {
  /**
   * Initialize this Ability by passing an already existing Playwright Page object.
   *
   * @param {Page} page the Playwright Page that will be used to browse.
   * @return {BrowseTheWeb} Returns the ability to use a browser
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
   */
  public static as(actor: Actor): BrowseTheWeb {
    return actor.withAbilityTo(this) as BrowseTheWeb;
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
   * @returns {Page} the page object
   */
  public getPage(): Page {
    return this.page;
  }

  /**
   * Use the page to navigate to the specified URL.
   *
   * @param {string} url the url to access.
   * @param {NavigateActionOptions} options
   * @return {Response} Returns the main resource response
   * @example
   * BrowseTheWeb.as(actor).goto('myURL');
   */
  public async goto(
    url: string,
    options?: NavigateActionOptions,
  ): Promise<Response | null> {
    return this.page.goto(url, options);
  }

  /**
   * Wait for the specified loading state.
   *
   * @param {string} status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
   * @param {WaitActionOptions} options
   * @return {void} Returns when the required load state has been reached.
   * @example
   * BrowseTheWeb.as(actor).waitForLoadState('networkidle');
   */
  public async waitForLoadState(
    status: "load" | "domcontentloaded" | "networkidle",
    options?: WaitActionOptions,
  ): Promise<void> {
    return this.page.waitForLoadState(status, options);
  }

  /**
   * Use the page mouse to hover over the specified element.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {SelectorOptions & HoverActionOptions} options
   * @return {void} Returns when hovered over the element
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).hover('mySelector');
   * // or with options
   * BrowseTheWeb.as(actor).hover('mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *     modifiers: ['Alt', 'Shift']
   * });
   */
  public async hover(
    selector: Selector,
    options?: SelectorOptions & HoverActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).hover({
      force: options?.force,
      modifiers: options?.modifiers,
      noWaitAfter: options?.noWaitAfter,
      position: options?.position,
      timeout: options?.timeout,
      trial: options?.trial,
    });
  }

  /**
   * Press the specified key(s) on the keyboard.
   *
   * @param {string} input the key(s). multiple keys can be pressed by concatenating with "+"
   * @param {PressActionOptions} options
   * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
   * @example
   * // Press a single button
   * BrowseTheWeb.as(actor).press('A');
   * // or multiple buttons
   * BrowseTheWeb.as(actor).press('Control+A');
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
   * @param {Selector} selector the selector of the source element.
   * @param {SelectorOptions & PressSequentiallyActionOptions} options
   * @param {string} input string of characters to sequentially press into a focused element
   * @return {void} Returns when the `keys` can specify the intended values or characters to generate the text for.
   * @example <caption>simple call with just selector and input value</caption>
   * BrowseTheWeb.as(actor).pressSequentially('ABC');
   */
  public async pressSequentially(
    selector: Selector,
    input: string,
    options?: SelectorOptions & PressActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).pressSequentially(input, {
      delay: options?.delay,
      noWaitAfter: options?.noWaitAfter,
      timeout: options?.timeout,
    });
  }

  /**
   * Check the specified checkbox.
   *
   * @param {Selector} selector the selector of the checkbox.
   * @param {SelectorOptions & CheckActionOptions} options
   * @return {void} Returns after checking the element
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).checkBox('mySelector');
   * // or with options
   * BrowseTheWeb.as(actor)
   *   .checkBox('mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', {
   *       hasText: 'anotherText' }
   * ]});
   */
  public async checkBox(
    selector: Selector,
    options?: SelectorOptions & CheckActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).check({
      force: options?.force,
      noWaitAfter: options?.noWaitAfter,
      position: options?.position,
      timeout: options?.timeout,
      trial: options?.trial,
    });
  }

  /**
   * Wait until the element of the specified selector exists.
   *
   * @param {Selector} selector the selector of the element.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Locator} Promise<Locator> returns the locator
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).waitForSelector('mySelector');
   * // or with options
   * BrowseTheWeb.as(actor).waitForSelector(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async waitForSelector(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<Locator> {
    return recursiveLocatorLookup({ page: this.page, selector, options });
  }

  /**
   * Drag the specified source element to the specified target element and drop it.
   *
   * @param {Selector} sourceSelector the selector of the source element.
   * @param {Selector} targetSelector the selector of the target element.
   * @param {SelectorOptions} options
   * @return {void} Returns after dragging the locator to another target locator or target position
   * @example
   * // simple call with just source and target selector
   * BrowseTheWeb.as(actor).dragAndDrop('sourceSelector', 'targetSelector');
   * // or with options
   * BrowseTheWeb.as(actor).dragAndDrop('sourceSelector', 'targetSelector', {
   *     source: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]},
   *     target: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]}
   * });
   */
  public async dragAndDrop(
    sourceSelector: Selector,
    targetSelector: Selector,
    options?: {
      source?: SelectorOptions;
      target?: SelectorOptions;
      action?: DragAndDropActionOptions;
    },
  ): Promise<void> {
    const target = await recursiveLocatorLookup({
      page: this.page,
      selector: targetSelector,
      options: options?.target,
    });
    return (
      await recursiveLocatorLookup({
        page: this.page,
        selector: sourceSelector,
        options: options?.source,
      })
    ).dragTo(target, {
      force: options?.action?.force,
      noWaitAfter: options?.action?.noWaitAfter,
      sourcePosition: options?.action?.sourcePosition,
      targetPosition: options?.action?.targetPosition,
      timeout: options?.action?.timeout,
      trial: options?.action?.trial,
    });
  }

  /**
   * Fill the element specified by the selector with the given input.
   *
   * @param {Selector} selector the selector of the source element.
   * @param {string} input the input to fill the element with.
   * @param {SelectorOptions & FillActionOptions} options
   * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
   * @example
   * // simple call with just selector and input value
   * BrowseTheWeb.as(actor).fill('mySelector', 'myInput');
   * // or with options
   * BrowseTheWeb.as(actor).fill('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
   */
  public async fill(
    selector: Selector,
    input: string,
    options?: SelectorOptions & FillActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).fill(input, {
      force: options?.force,
      noWaitAfter: options?.noWaitAfter,
    });
  }

  /**
   * Type the given input into the element specified by the selector.
   * @deprecated Use {@link fill} instead.
   * @param {Selector} selector the selector of the source element.
   * @param {string} input the input to type into the element.
   * @param {SelectorOptions & TypeActionOptions} options
   * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
   * @example
   * // simple call with just selector and input value
   * BrowseTheWeb.as(actor).type('mySelector', 'myInput');
   * // or with options
   * BrowseTheWeb.as(actor).type(
   *   'mySelector',
   *   'myInput', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async type(
    selector: Selector,
    input: string,
    options?: SelectorOptions & TypeActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).type(input, {
      delay: options?.delay,
      noWaitAfter: options?.noWaitAfter,
      timeout: options?.timeout,
    });
  }

  /**
   * Click the element specified by the selector.
   *
   * @param {Selector} selector the selector of the element to click.
   * @param {SelectorOptions & ClickActionOptions} options
   * @return {void} Returns after clicking the element
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).click('mySelector');
   * // or with options
   * BrowseTheWeb.as(actor).click('mySelector', {
   *   hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
   */
  public async click(
    selector: Selector,
    options?: SelectorOptions & ClickActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).click({
      button: options?.button,
      clickCount: options?.clickCount,
      delay: options?.delay,
      force: options?.force,
      modifiers: options?.modifiers,
      noWaitAfter: options?.noWaitAfter,
      position: options?.position,
      timeout: options?.timeout,
      trial: options?.trial,
    });
  }

  /**
   * Double click the element specified by the selector.
   *
   * @param {Selector} selector the selector of the element to double click.
   * @param {SelectorOptions & DblclickActionOptions} options
   * @return {void} Returns after double clicking the element
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).dblclick('mySelector');
   * // or with options
   * BrowseTheWeb.as(actor).dblclick('mySelector', {
   *   hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
   */
  public async dblclick(
    selector: Selector,
    options?: SelectorOptions & DblclickActionOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).dblclick({
      button: options?.button,
      delay: options?.delay,
      force: options?.force,
      modifiers: options?.modifiers,
      noWaitAfter: options?.noWaitAfter,
      position: options?.position,
      timeout: options?.timeout,
      trial: options?.trial,
    });
  }

  /**
   * Focus the element specified by the selector.
   *
   * @param {Selector} selector the selector of the element to focus.
   * @param {SelectorOptions} options
   * @return {void} Returns after focus the element
   * @example <caption> simple call with just selector </caption>
   * BrowseTheWeb.as(actor).focus('mySelector');
   * @example <caption> with options </caption>
   * ```
   * BrowseTheWeb.as(actor).focus('mySelector', {
   *   hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
   * ```
   */
  public async focus(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).focus({
      timeout: options?.timeout,
    });
  }

  /**
   * Validate if the page has specified URL.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|RegExp} expectedUrl the expected url of the page.
   * @param {number} options (optional) timeout in milliseconds to wait for the element to be visible/hidden.
   * @returns {boolean} Promise<boolean> true if the page has URL as expected, false if the timeout was reached.
   */
  public async checkPageUrl(
    positive: boolean,
    expectedUrl: string | RegExp,
    options?: ScreenOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(this.page).toHaveURL(expectedUrl, options);
    } else {
      await expect(this.page).not.toHaveURL(expectedUrl, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the page has specified title.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|RegExp} expectedTitle the expected title of the page.
   * @param {number} timeout (optional) time in milliseconds to wait for the element to be visible/hidden.
   * @returns {boolean} Promise<boolean> true if the page has title as expected, false if the timeout was reached.
   */
  public async checkPageTitle(
    positive: boolean,
    expectedTitle: string | RegExp,
    options?: ScreenOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(this.page).toHaveTitle(expectedTitle, options);
    } else {
      await expect(this.page).not.toHaveTitle(expectedTitle, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the page has specified title.
   *
   * @param {boolean} positive whether to check the property of the page positive or not.
   * @param {string|string[]} name the screenshot name
   * @param {number} timeout (optional) time in milliseconds to wait for.
   * @returns {boolean} Promise<boolean> true if the page has title as expected, false if the timeout was reached.
   */
  public async checkPageScreenshot(
    positive: boolean,
    name: string | string[],
    options?: ScreenOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(this.page).toHaveScreenshot(name, options);
    } else {
      await expect(this.page).not.toHaveScreenshot(name, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is visible or hidden.
   *
   * @param {Selector} selector the locator to search for.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} Promise<boolean> true if the element is visible/hidden as expected, false if the timeout was reached.
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).checkVisibilityState('mySelector', true);
   * // or with options
   * BrowseTheWeb.as(actor).checkVisibilityState(
   *   'mySelector',
   *   false, {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async checkVisibilityState(
    selector: Selector,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeVisible({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "hidden" },
        }),
      ).toBeHidden({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Verify if a locator on the page is enabled or disabled.
   *
   * @param {Selector} selector the locator to search for.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} true if the element is enabled/disabled as expected, false if the timeout was reached.
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).checkEnabledState('mySelector', true);
   * // or with options
   * BrowseTheWeb.as(actor).checkEnabledState(
   *   'mySelector',
   *   false, {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async checkEnabledState(
    selector: Selector,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeEnabled({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeDisabled({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if a locator on the page is editable or not.
   *
   * @param {Selector} selector the locator to search for.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} true if the element is editable/not as expected, false if the timeout was reached.
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).checkEditableState('mySelector', true);
   * // or with options
   * BrowseTheWeb.as(actor).checkEditableState(
   *   'mySelector',
   *   false, {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async checkEditableState(
    selector: Selector,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeEditable({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toBeEditable({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if a locator on the page is focused or not.
   *
   * @param {Selector} selector the locator to search for.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} true if the element is editable/not as expected, false if the timeout was reached.
   * @example
   * // simple call with just selector
   * BrowseTheWeb.as(actor).checkFocusedState('mySelector', true);
   * // or with options
   * BrowseTheWeb.as(actor).checkFocusedState(
   *   'mySelector',
   *   false, {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async checkFocusedState(
    selector: Selector,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeFocused({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toBeFocused({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element is checked.
   *
   * @param {Selector} selector the selector of the element.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkCheckedState(
    selector: Selector,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeChecked({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toBeChecked({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given text or not.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {string | RegExp | (string | RegExp)[]} text the text to check.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkSelectorText(
    selector: Selector,
    text: TextPayload,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveText(text, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveText(text, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element contains the given text or not.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {TextPayload} text the text to check.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkSelectorContainText(
    selector: Selector,
    text: TextPayload,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toContainText(text, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toContainText(text, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given input value or not.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {ValuePayload} value the single value to check.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkSelectorValue(
    selector: Selector,
    value: ValuePayload,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveValue(value, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveValue(value, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the element has exact number of DOM node.
   *
   * @param {Selector} selector the selector of the element.
   * @param {CountPayload} count the minimum count of the element to be visible.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param options (optional) options for assertion.
   */
  public async checkSelectorCount(
    selector: Selector,
    count: CountPayload,
    positive: boolean,
    options?: { timeout?: number },
  ): Promise<boolean> {
    const locator =
      typeof selector === "string" ? this.page.locator(selector) : selector;
    if (positive) {
      await expect(locator).toHaveCount(count, options);
    } else {
      await expect(locator).not.toHaveCount(count, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given CSS or not.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {StylePayload} style the style name and value to check.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkSelectorCSS(
    selector: Selector,
    style: StylePayload,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveCSS(style.name, style.value, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveCSS(style.name, style.value, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given screenshot or not.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {ScreenshotPayload} name the screenshot name.
   * @param {boolean} positive whether to check the property of the selector positive or not.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   */
  public async checkSelectorScreenshot(
    selector: Selector,
    name: ScreenshotPayload,
    positive: boolean,
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (positive) {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveScreenshot(name, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveScreenshot(name, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.
   * @param {string|string[]} urls affected urls
   * @return {Cookie[]} Returns the cookies of the current browser context.
   * @example
   * // get all cookies
   * BrowseTheWeb.as(actor).getCookies();
   * // get cookies for one single domain
   * BrowseTheWeb.as(actor).getCookies('https:www.myapp.com');
   * // get cookies for two domains
   * BrowseTheWeb.as(actor).getCookies(['https:www.myapp.com', 'https:www.another-app.com']);
   */
  public async getCookies(
    urls?: string | string[] | undefined,
  ): Promise<Cookie[]> {
    return this.page.context().cookies(urls);
  }

  /**
   * Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).
   * @param {Cookie[]} cookies Cookies to add at browser context
   * @return {void} Returns after adding cookies into this browser context.
   * @example
   * BrowseTheWeb.as(actor).addCookies([{
   *   name: 'my cookie',
   *   value: 'my value',
   *   url: 'http://www.myapp.com',
   * }]);
   */
  public async addCookies(cookies: Cookie[]): Promise<void> {
    return this.page.context().addCookies(cookies);
  }

  /**
   * Clear the browser context cookies.
   * @return {void} Clears context cookies.
   * @example
   * BrowseTheWeb.as(actor).clearCookies();
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
   * BrowseTheWeb.as(actor).getLocalStorageItem('some key');
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
   * BrowseTheWeb.as(actor).setLocalStorageItem('some key', 'some value');
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
   * BrowseTheWeb.as(actor).removeLocalStorageItem('some key');
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
   * BrowseTheWeb.as(actor).getSessionStorageItem('some key');
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
   * BrowseTheWeb.as(actor).setSessionStorageItem('some key', 'some value');
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
   * BrowseTheWeb.as(actor).removeSessionStorageItem('some key');
   */
  public async removeSessionStorageItem(key: string): Promise<void> {
    return this.page.evaluate((k) => {
      sessionStorage.removeItem(k);
      return Promise.resolve();
    }, key);
  }

  /**
   * Set the value of a Selector of type select to the given option.
   *
   * @param {Selector} selector the string representing the (select) selector.
   * @param {string} option the label of the option.
   * @param {SelectorOptions} selectorOptions (optional): advanced selector lookup options.
   * @return {any} Returns the array of option values that have been successfully selected.
   * @example
   * // simple call with just selector and input value
   * BrowseTheWeb.as(actor).selectOption('mySelector', 'myOptionLabel');
   * // or with options
   * BrowseTheWeb.as(actor).selectOption(
   *   'mySelector',
   *   'myOptionLabel', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public async selectOption(
    selector: Selector,
    option: string | { value?: string; label?: string; index?: number },
    options?: SelectorOptions & SelectActionOptions,
  ): Promise<any> {
    return (
      await recursiveLocatorLookup({
        page: this.page,
        selector,
        options: options,
      })
    ).selectOption(option, {
      force: options?.force,
      noWaitAfter: options?.noWaitAfter,
      timeout: options?.timeout,
    });
  }
}
