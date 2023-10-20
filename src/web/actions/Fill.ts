import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { FillActionOptions } from "../types";

/**
 * Fill an element specified by a locator string with the specified input.
 *
 * @group Actions
 */
export class Fill extends Action {
  private constructor(
    private locator: Locator,
    private input: string,
    private options?: FillActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and fill it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
   */
  public async performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).fill(this.locator, this.input, this.options);
  }

  /**
   * Finds the specified locator and will it with the specified input string.
   *
   * @param {Locator} locator the locator.
   * @param {string} input the input.
   * @param {FillActionOptions} options (optional) options for the fill action.
   * @return {Fill} new Fill instance
   * @example
   * simple call with just locator
   * ```typescript
   * Fill.in(
   *   page.locator('myLocator'),
   *   'myInput'
   * );
   * ```
   * with options
   * ```typescript
   * Fill.in(
   *   page.locator('myLocator'),
   *   'myInput',
   *   { timeout: 3000 }
   * );
   * ```
   */
  public static in(
    locator: Locator,
    input: string,
    options?: FillActionOptions,
  ): Fill {
    return new Fill(locator, input, options);
  }
}
