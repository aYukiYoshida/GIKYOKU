import { Actor, Question } from "@testla/screenplay";
import { Page } from "playwright";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  ScreenOptions,
  ScreenQuestionMode,
  UrlPayload,
  isUrlPayload,
  ScreenshotPayload,
  isScreenshotPayload,
  TitlePayload,
  isTitlePayload,
} from "../types";

/**
 * @category Questions
 *
 * Get a specified state for page.
 * A mode operator must be prepended.
 */
export class Screen extends Question<boolean> {
  private positive = true;
  private mode: ScreenQuestionMode = "haveUrl";

  // the expected URL or title.
  private payload: UrlPayload | TitlePayload | ScreenshotPayload = "";

  // options.
  private options?: ScreenOptions;

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
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "haveUrl") {
      if (isUrlPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkPageUrl(
            this.positive,
            this.payload,
            this.options,
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
   * @category mode operators
   *
   * Verifies if the page has URL.
   *
   * @param {TitlePayload} url the expected URL.
   * @param {ScreenOptions} options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * // simple call with just selector
   * Screen.toHaveTitle('Title');
   * // or with options
   * Screen.not.toHaveTitle('Title', { timeout: 1000 });
   */
  public haveTitle(title: TitlePayload, options?: ScreenOptions): Screen {
    this.mode = "haveTitle";
    this.payload = title;
    this.options = options;

    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {UrlPayload} url the expected URL.
   * @param {ScreenOptions} options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * // simple call with just selector
   * Screen.toHaveUrl('https://www.example.com');
   * // or with options
   * Screen.not.toHaveUrl('https://www.example.com', { timeout: 1000 });
   */
  public haveUrl(url: UrlPayload, options?: ScreenOptions): Screen {
    this.mode = "haveUrl";
    this.payload = url;
    this.options = options;

    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {ScreenshotPayload} name the screenshot name.
   * @param {ScreenOptions} options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * // simple call with just selector
   * Screen.toHaveScreenshot('example.png');
   * // or with options
   * Screen.not.toHaveScreenshot('example.png', { timeout: 1000 });
   */
  public haveScreenshot(
    name: ScreenshotPayload,
    options?: ScreenOptions,
  ): Screen {
    this.mode = "haveScreenshot";
    this.payload = name;
    this.options = options;

    return this;
  }

  /**
   * Prompt a question to verify the page.
   *
   * @param {page} page the page object of the Playwright
   * @return {Screen} Screen instance
   */
  public static of(page?: Page): Screen {
    return new Screen(page);
  }
}
