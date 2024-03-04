import { Action, Actor } from "@testla/screenplay";
import { Locator } from "playwright";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Focus on an element specified by a locator string.
 *
 * @group Actions
 * @category to interact
 */
export class Focus extends Action {
  private constructor(
    private locator: Locator,
    private options?: { timeout?: number },
  ) {
    super();
  }

  /**
   * find the specified locator and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after focusing the element
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).focus(this.locator, this.options);
  }

  /**
   * specify which element should be focused on
   *
   * @param {Locator} locator the string representing the locator.
   * @param {LocatorOptions} options (optional) options for the focus action.
   * @return {Focus} new Focus instance
   * @example
   * simple call with just locator
   * ```typescript
   * Click.on(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```typescript
   * Click.on(
   *   page.locator('myLocator'),
   *   { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static on(locator: Locator, options?: { timeout?: number }): Focus {
    const instance = new Focus(locator, options);
    instance.setCallStackInitializeCalledWith({ locator, options });
    return instance;
  }
}
