import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { DblclickActionOptions } from "../types";

/**
 * Click on an element specified by a locator string.
 *
 * @group Actions
 * @category to interact
 */
export class DoubleClick extends Action {
  private constructor(
    private locator: Locator,
    private options?: DblclickActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after double clicking the element
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).dblclick(this.locator, this.options);
  }

  /**
   * specify which element should be double-clicked on
   *
   * @param {Locator} locator the string representing the locator.
   * @param {DblclickActionOptions} options (optional) options for the double-click action.
   * @return {DoubleClick} new DoubleClick instance
   * @example
   * simple call with just locator
   * ```typescript
   * DoubleClick.on(
   *   page.locator('myLocator')
   * );
   * ```
   * with options
   * ```typescript
   * DoubleClick.on(
   *   page.locator('myLocator'),
   *  { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static on(
    locator: Locator,
    options?: DblclickActionOptions,
  ): DoubleClick {
    const instance = new DoubleClick(locator, options);
    instance.setCallStackInitializeCalledWith({ locator, options });
    return instance;
  }
}
