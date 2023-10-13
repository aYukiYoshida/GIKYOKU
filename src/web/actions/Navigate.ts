import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * @group Actions
 *
 * Navigate to a URL using the specified url string.
 */
export class Navigate extends Action {
  private constructor(private url: string) {
    super();
  }

  /**
   * navigate to the specified URL.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} Returns the main resource response.
   */
  public performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).goto(this.url);
  }

  /**
   * Use the page to navigate to a certain URL.
   *
   * @param {string} url the url which should be accessed.
   * @return {Navigate} new Navigate instance
   * @example
   * Navigate.to('https://www.example.com');
   */
  public static to(url: string): Navigate {
    return new Navigate(url);
  }
}
