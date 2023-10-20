import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { HoverActionOptions } from "../types";

/**
 * Hover over an element specified by a locator.
 *
 * @group Actions
 */
export class Hover extends Action {
  private constructor(
    private locator: Locator,
    private options?: HoverActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and hover over it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns when hovered over the element
   */
  public performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).hover(this.locator, this.options);
  }

  /**
   * Specify which locator should be hovered over
   *
   * @param {Locator} locator The locator that should be hovered over.
   * @param {HoverActionOptions} options (optional) options for the hover action.
   * @return {Hover} new Hover instance
   * @example
   * simple call with just locator
   * ```typescript
   * Hover.over(
   *   page.locator('myLocator')
   * );
   * with options
   * ```typescript
   * Hover.over(
   *   page.locator('myLocator'),
   *   { timeout: 3000 }
   * );
   * ```
   */
  public static over(locator: Locator, options?: HoverActionOptions): Hover {
    return new Hover(locator, options);
  }
}
