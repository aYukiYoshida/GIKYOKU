import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ClickActionOptions, Point, isPoint } from "../types";

/**
 * Click on an element specified by a locator string.
 *
 * @group Actions
 * @category to interact
 */
export class Click extends Action {
  private constructor(
    private locator: Locator | Point,
    private options?: ClickActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after clicking the element
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    if (isPoint(this.locator)) {
      return BrowseTheWeb.as(actor).click(this.locator, this.options);
    }
    await BrowseTheWeb.as(actor).click(this.locator, this.options);
  }

  /**
   * specify which element should be clicked on
   *
   * @param {Locator} locator the string representing the locator.
   * @param {ClickActionOptions} options (optional) options for the click action.
   * @return {Click} new Click instance
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
  public static on(locator: Locator, options?: ClickActionOptions): Click {
    const instance = new Click(locator, options);
    instance.setCallStackInitializeCalledWith({ locator, options });
    return instance;
  }

  /**
   * specify which point should be clicked at
   *
   * @param {Point} point the point representing the coordinates.
   * @param {ClickActionOptions} options (optional) options for the click action.
   * @return {Click} new Click instance
   * @example
   * simple call with just point
   * ```typescript
   * Click.at(
   *   { x: 100, y: 200 }
   * );
   * ```
   * with options
   * ```typescript
   * Click.at(
   *   { x: 100, y: 200 },
   *   { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static at(point: Point, options?: ClickActionOptions): Click {
    const instance = new Click(point, options);
    instance.setCallStackInitializeCalledWith({ point, options });
    return instance;
  }
}
