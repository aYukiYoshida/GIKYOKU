import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { CheckActionOptions } from "../types";

/**
 * Check a checkbox specified with locator.
 *
 * @group Actions
 * @category to interact
 */
export class Check extends Action {
  private constructor(
    private locator: Locator,
    private options?: CheckActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after checking the element
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).checkBox(this.locator, this.options);
  }

  /**
   * specify which element should be clicked on
   *
   * @param {Locator} locator the string representing the locator.
   * @param {CheckActionOptions} options (optional): options for the check action.
   * @return {Check} new Check instance
   * @example
   * simple call with just locator
   * ```typescript
   * Check.element(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```typescript
   * Check.element(
   *   page.locator('myLocator'),
   *   { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static element(locator: Locator, options?: CheckActionOptions): Check {
    return new Check(locator, options);
  }
}
