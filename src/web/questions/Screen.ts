import { Actor, Question } from "@testla/screenplay";
import { Page } from "playwright";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  ScreenQuestionMode,
  UrlPayload,
  isUrlPayload,
  ScreenshotPayload,
  isScreenshotPayload,
  TitlePayload,
  isTitlePayload,
} from "../types";

/**
 * Get a specified state for page.
 * A mode operator must be prepended.
 *
 * @group Questions
 */
export class Screen extends Question<boolean> {
  private positive = true;
  private mode: ScreenQuestionMode = "haveUrl";

  // the expected URL or title.
  private payload: UrlPayload | TitlePayload | ScreenshotPayload = "";

  // options.
  private options?: { timeout?: number };

  /**
   * @param {Page} page the playwright page object to verify.
   */
  private constructor(private page?: Page) {
    super();
  }

  /**
   * Verifies if an element.
   *
   * @param {Actor} actor the actor
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   * @category called internally
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "haveUrl") {
      if (isUrlPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkPageUrl(
            this.positive,
            this.payload,
            this.options,
            this.page,
          ),
        ); // if the ability method is not the expected result there will be an exception
      } else {
        throw Error("Screen.haveUrl: incompatible payload.");
      }
    }
    if (this.mode === "haveTitle") {
      if (isTitlePayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkPageTitle(
            this.positive,
            this.payload,
            this.options,
            this.page,
          ),
        ); // if the ability method is not the expected result there will be an exception
      } else {
        throw Error("Screen.haveTitle: incompatible payload.");
      }
    }
    if (this.mode === "haveScreenshot") {
      if (isScreenshotPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkPageScreenshot(
            this.positive,
            this.payload,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      } else {
        throw Error("Screen.haveScreenshot: incompatible payload.");
      }
    }
    throw new Error("Unknown mode: Element.answeredBy");
  }

  /**
   * make the verifying for the positive.
   * @return {Screen} new Screen instance
   * @example <caption>Verify with Screen class.</caption>
   * actor.asks(
   *  Screen.does.haveUrl("https://example.com")
   * );
   */
  static get does() {
    return new Screen();
  }

  /**
   * make the Question check for the negative.
   * @return {Screen} new Screen instance
   * @example <caption>Verify with Element class.</caption>
   * actor.asks(
   *  Screen.does.not.haveURL("https://example.com")
   * );
   */
  public get not() {
    this.positive = false;
    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {TitlePayload} url the expected URL.
   * @param options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * simple call with just locator
   * ```typescript
   * Screen.toHaveTitle('Title');
   * ```
   * with options
   * ```typescript
   * Screen.not.toHaveTitle(
   *   'Title',
   *   { timeout: 1000 }
   * );
   * ```
   * @category mode operators
   */
  public haveTitle(
    title: TitlePayload,
    options?: { timeout?: number },
  ): Screen {
    this.mode = "haveTitle";
    this.payload = title;
    this.options = options;
    this.addToCallStack({
      caller: "haveTitle",
      calledWith: { title, options },
    });

    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {UrlPayload} url the expected URL.
   * @param options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * simple call with just locator
   * ```typescript
   * Screen.toHaveUrl('https://www.example.com');
   * ```
   * with options
   * ```typescript
   * Screen.not.toHaveUrl('https://www.example.com', { timeout: 1000 });
   * ```
   * @category mode operators
   */
  public haveUrl(url: UrlPayload, options?: { timeout?: number }): Screen {
    this.mode = "haveUrl";
    this.payload = url;
    this.options = options;
    this.addToCallStack({ caller: "haveUrl", calledWith: { url, options } });

    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {ScreenshotPayload} name the screenshot name.
   * @param options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * simple call with just locator
   * ```typescript
   * Screen.toHaveScreenshot('example.png');
   * ```
   * with options
   * ```typescript
   * Screen.not.toHaveScreenshot(
   *   'example.png',
   *   { timeout: 1000 }
   * );
   * ```
   * @category mode operators
   */
  public haveScreenshot(
    name: ScreenshotPayload,
    options?: { timeout?: number },
  ): Screen {
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
   * Prompt a question to verify the page.
   *
   * @param {page} page the page object of the Playwright
   * @return {Screen} new Screen instance
   * @category Factory
   */
  public static of(page?: Page): Screen {
    return new Screen(page);
  }
}
