import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { NavigateActionOptions } from "../types";

/**
 * Navigate to a URL using the specified url string.
 *
 * @group Actions
 * @category to interact
 */
export class Navigate extends Action {
  private constructor(
    private url: string,
    private options?: NavigateActionOptions,
  ) {
    super();
  }

  /**
   * navigate to the specified URL.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} Returns the main resource response.
   * @category called internally
   */
  public performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).goto(this.url, this.options);
  }

  /**
   * Use the page to navigate to a certain URL.
   *
   * @param {string} url the url which should be accessed.
   * @param {NavigateActionOptions} options (optional) navigation options.
   * @return {Navigate} new Navigate instance
   * @example
   * ```typescript
   * Navigate.to('https://www.example.com');
   * ```
   * @category Factory
   */
  public static to(url: string, options?: NavigateActionOptions): Navigate {
    return new Navigate(url, options);
  }
}
