import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Remove from the Browser.
 *
 * @group Actions
 * @category related to cookies
 */
export class Clear extends Action {
  /**
   * wait for either a specified loading state or for a locator to become visible/active.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} Clears context cookies
   * @category called internally
   */
  // eslint-disable-next-line class-methods-use-this
  public performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).clearCookies();
  }

  /**
   * Clear all browser cookies.
   * @return {Clear} new Clear instance
   * @example
   * ```typescript
   * Clear.cookies();
   * ```
   * @category Factory
   */
  public static cookies(): Clear {
    return new Clear();
  }
}
