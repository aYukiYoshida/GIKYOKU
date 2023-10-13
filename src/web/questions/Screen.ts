import { Actor, Question } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenOptions } from "../types";

/**
 * @category Questions
 *
 * Get a specified state for page.
 * A mode operator must be prepended.
 */
export class Screen extends Question<boolean> {
  private mode: "toHaveUrl" | "toHaveTitle" = "toHaveUrl";

  // the expected URL or title.
  private payload: string | RegExp = "";

  // options.
  private options?: ScreenOptions;

  private constructor(private checkMode: "toBe" | "notToBe") {
    super();
  }

  /**
   * Verifies if an element.
   *
   * @param {Actor} actor the actor
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "toHaveUrl") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkPageUrl(
          this.checkMode === "toBe" ? "toHaveUrl" : "notToHaveUrl",
          this.payload,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "toHaveTitle") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkPageTitle(
          this.checkMode === "toBe" ? "toHaveTitle" : "notToHaveTitle",
          this.payload,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    throw new Error("Unknown mode: Element.answeredBy");
  }

  /**
   * make the Question check for the positive.
   * @return {Screen} new Screen instance
   */
  static get toBe() {
    return new Screen("toBe");
  }

  /**
   * make the Question check for the negative.
   * @return {Screen} new Screen instance
   */
  static get notToBe() {
    return new Screen("notToBe");
  }

  /**
   * make the Question check for the positive.
   * @return {Screen} new Screen instance
   */
  static get toHave() {
    return new Screen("toBe");
  }

  /**
   * make the Question check for the negative.
   * @return {Screen} new Screen instance
   */
  static get notToHave() {
    return new Screen("notToBe");
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
  public title(title: string | RegExp, options?: ScreenOptions): Screen {
    this.mode = "toHaveTitle";
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
  public url(url: string | RegExp, options?: ScreenOptions): Screen {
    this.mode = "toHaveUrl";
    this.payload = url;
    this.options = options;

    return this;
  }
}
