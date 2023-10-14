import { Actor, Question } from "@testla/screenplay";
import { Page } from "playwright";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenOptions } from "../types";

type Mode = "haveUrl" | "haveTitle";

/**
 * @category Questions
 *
 * Get a specified state for page.
 * A mode operator must be prepended.
 */
export class Screen extends Question<boolean> {
  private positive = true;
  private mode: Mode = "haveUrl";

  // the expected URL or title.
  private payload: string | RegExp = "";

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
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkPageUrl(
          this.positive ? "toHaveUrl" : "notToHaveUrl",
          this.payload,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "haveTitle") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkPageTitle(
          this.positive ? "toHaveTitle" : "notToHaveTitle",
          this.payload,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
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
   * @param {string|RegExp} url the expected URL.
   * @param {ScreenOptions} options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * // simple call with just selector
   * Screen.toHave.title('Title');
   * // or with options
   * Screen.notToHave.title('Title', { timeout: 1000 });
   */
  public haveTitle(title: string | RegExp, options?: ScreenOptions): Screen {
    this.mode = "haveTitle";
    this.payload = title;
    this.options = options;

    return this;
  }

  /**
   * Verifies if the page has URL.
   *
   * @param {string|RegExp} url the expected URL.
   * @param {number} options the timeout in milliseconds.
   * @return {Screen} this Screen instance
   * @example
   * // simple call with just selector
   * Screen.toHave.url('https://www.example.com');
   * // or with options
   * Screen.notToHave.url('https://www.example.com', { timeout: 1000 });
   */
  public haveUrl(url: string | RegExp, options?: ScreenOptions): Screen {
    this.mode = "haveUrl";
    this.payload = url;
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
