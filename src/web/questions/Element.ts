import { Locator } from "@playwright/test";
import { Actor, Question } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  ElementQuestionMode,
  TextPayload,
  isTextPayload,
  ValuePayload,
  isValuePayload,
  CountPayload,
  isCountPayload,
  StylePayload,
  isStylePayload,
  ScreenshotPayload,
  isScreenshotPayload,
} from "../types";

type Options =
  | { timeout?: number }
  | { timeout?: number; visible?: boolean }
  | { timeout?: number; enabled?: boolean }
  | { timeout?: number; editable?: boolean }
  | { timeout?: number; checked?: boolean }
  | { timeout?: number; ratio?: number }
  | { timeout?: number; ignoreCase?: boolean; useInnerText?: boolean };

/**
 * Get a specified state for locator.
 * A mode operator must be prepended.
 *
 * @group Questions
 */
export class Element extends Question<boolean> {
  private positive = true;
  private mode: ElementQuestionMode = "visible";
  private payload:
    | TextPayload
    | ValuePayload
    | CountPayload
    | StylePayload
    | ScreenshotPayload = "";
  private options?: Options;

  /**
   * @param {Locator} locator the locator of the element to check.
   */
  private constructor(private locator: Locator) {
    super();
  }

  /**
   * Verify if an element has the specified state.
   *
   * @param {Actor} actor the actor
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   * @category called internally
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "visible") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkVisibilityState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "enabled") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEnabledState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "editable") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEditableState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "checked") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkCheckedState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "focused") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkFocusedState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "inViewport") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkLocatorInViewportState(
          this.locator,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "haveText") {
      if (isTextPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorHasText(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveText: incompatible payload.");
    }
    if (this.mode === "containText") {
      if (isTextPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorContainsText(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.containText: incompatible payload.");
    }
    if (this.mode === "haveValue") {
      if (isValuePayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorHasValue(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveValue: incompatible payload.");
    }
    if (this.mode === "haveCount") {
      if (isCountPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorHasCount(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveCount: incompatible payload.");
    }
    if (this.mode === "haveCSS") {
      if (isStylePayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorHasCSS(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveCSS: incompatible payload.");
    }
    if (this.mode === "haveScreenshot") {
      if (isScreenshotPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkLocatorHasScreenshot(
            this.locator,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveScreenshot: incompatible payload.");
    }
    throw new Error("Unknown mode: Element.answeredBy");
  }

  /**
   * make the verifying for the negative.
   * @return {Element} this Element instance
   * @example
   * Verify with Element class
   * ```typescript
   * actor.asks(
   *  Element.of(page.getByRole("heading")).not.visible()
   * );
   * ```
   */
  public get not() {
    this.positive = false;
    return this;
  }

  /**
   * Verify if an element is visible.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options.
   * ```typescript
   * Element.of(page.locator("myLocator"))
   *   .visible();
   * ```
   * with options
   * ```typescript
   * Element.of(page.locator("myLocator"))
   *   .not.visible({ timeout: 1000 });
   * ```
   * @category mode operators
   */
  public visible(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;

    visible?: boolean;
  }): Element {
    this.mode = "visible";
    this.options = options;
    this.addToCallStack({ caller: "visible", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element is enabled.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options </caption>
   * ```typescript
   * Element.of(page.locator("myLocator"))
   *   .not.enabled();
   * ```
   * with options
   * ```typescript
   * Element.of(page.locator("myLocator"))
   *   .enabled({timeout: 1000});
   * ```
   * @category mode operators
   */
  public enabled(options?: {
    enabled?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Element {
    this.mode = "enabled";
    this.options = options;
    this.addToCallStack({ caller: "enabled", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element is editable.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator')
   * ).editable();
   * ```
   * with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator'),
   * ).not.editable({ timeout: 1000 });
   * ```
   * @category mode operators
   */
  public editable(options?: {
    editable?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Element {
    this.mode = "editable";
    this.options = options;
    this.addToCallStack({ caller: "editable", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element is checked.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator')
   * ).checked();
   * ```
   * with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator'),
   * ).not.checked({ timeout: 1000 });
   * ```
   * @category mode operators
   */
  public checked(options?: {
    checked?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Element {
    this.mode = "checked";
    this.options = options;
    this.addToCallStack({ caller: "checked", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element is focused.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator')
   * ).focused();
   * ```
   * with options
   * ```
   * Element.of(
   *   page.locator('myLocator'),
   * ).not.focused({ timeout: 1000});
   * ```
   * @category mode operators
   */
  public focused(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Element {
    this.mode = "focused";
    this.options = options;
    this.addToCallStack({ caller: "focused", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element is displayed in window.
   *
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @example
   * simple call with just locator or with options
   * ```typescript
   * Element.of(
   *   page.locator('myLocator')
   * ).displayed();
   * ```
   * with options
   * ```
   * Element.of(
   *   page.locator('myLocator'),
   * ).not.displayed({ timeout: 1000});
   * ```
   * @category mode operators
   */
  public inViewport(options?: {
    /**
     * The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at any positive ratio. Defaults to `0`.
     */
    ratio?: number;
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Element {
    this.mode = "inViewport";
    this.options = options;
    this.addToCallStack({ caller: "inViewport", calledWith: { options } });

    return this;
  }

  /**
   * Verify if an element has the given text.
   *
   * @param text the text to check.
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @category mode operators
   */
  public haveText(
    text: TextPayload,
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
  ): Element {
    this.mode = "haveText";
    this.payload = text;
    this.options = options;
    this.addToCallStack({ caller: "haveText", calledWith: { text, options } });

    return this;
  }

  /**
   * Verify if an element contains the given text.
   *
   * @param text the text to check.
   * @param options (optional) options for assertions.
   * @return {Element} this Element instance
   * @category mode operators
   */
  public containText(
    text: TextPayload,
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
  ): Element {
    this.mode = "containText";
    this.payload = text;
    this.options = options;
    this.addToCallStack({
      caller: "containText",
      calledWith: { text, options },
    });

    return this;
  }

  /**
   * Verify if an element has the given value.
   *
   * @param value the value to check.
   * @param options (optional) options for assertions.
   * @returns {Element} this Element instance
   * @category mode operators
   */
  public haveValue(
    value: ValuePayload,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Element {
    this.mode = "haveValue";
    this.payload = value;
    this.options = options;
    this.addToCallStack({
      caller: "haveValue",
      calledWith: { value, options },
    });

    return this;
  }

  /**
   * Verify if an element has exact number of DOM node.
   *
   * @param count the value to check.
   * @param options (optional) options for assertions.
   * @returns {Element} this Element instance
   * @category mode operators
   */
  public haveCount(
    count: CountPayload,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Element {
    this.mode = "haveCount";
    this.payload = count;
    this.options = options;
    this.addToCallStack({
      caller: "haveCount",
      calledWith: { count, options },
    });

    return this;
  }

  /**
   * Verify if an element has the given style.
   *
   * @param name the style name.
   * @param value the style value.
   * @param options (optional) options for assertions.
   * @returns {Element} this Element instance
   * @category mode operators
   */
  public haveCSS(
    name: string,
    value: string | RegExp,
    options?: {
      /**
       * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
       */
      timeout?: number;
    },
  ): Element {
    this.mode = "haveCSS";
    this.payload = { name, value };
    this.options = options;
    this.addToCallStack({
      caller: "haveCSS",
      calledWith: { name, value, options },
    });

    return this;
  }

  /**
   * Verify if an element has the given screenshot.
   *
   * @param name the screenshot name.
   * @category mode operators
   */
  public haveScreenshot(
    name: string,
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
  ): Element {
    this.mode = "haveScreenshot";
    this.payload = name;
    this.options = options;
    this.addToCallStack({
      caller: "haveScreenshot",
      calledWith: { name, options },
    });

    return this;
  }

  /**
   * Prompt a question to verify the element.
   *
   * @param {Locator} locator the locator of the element to check.
   * @return {Element} new Element instance
   * @category Factory
   */
  public static of(locator: Locator) {
    return new Element(locator);
  }
}
