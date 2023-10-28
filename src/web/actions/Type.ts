import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { TypeActionOptions } from "../types";

/**
 * Type specified input into an element specified by a locator.
 * @deprecated In most cases, you should use {@link Fill.in} instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use {@link Press.characters}.
 * @group Actions
 * @category to interact
 */
export class Type extends Action {
  private constructor(
    private locator: Locator,
    private input: string,
    private options?: TypeActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and fill it.
   * @param {Actor} actor the actor which is used
   * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).type(this.locator, this.input, this.options);
  }

  /**
   * Finds the specified locator and will it with the specified input string.
   *
   * @param {Locator} locator the locator.
   * @param {string} input the input.
   * @param {LocatorOptions & TypeActionOptions} options (optional) options for the type action.
   * @return {Type} new Type instance
   * @example
   * simple call with just locator
   * ```typescript
   * Type.in(
   *   page.locator('myLocator'),
   *   'myInput'
   * );
   * ```
   * with options
   * ```typescript
   * Type.in(
   *   page.locator('myLocator'),
   *   'myInput',
   *   { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static in(
    locator: Locator,
    input: string,
    options?: TypeActionOptions,
  ): Type {
    return new Type(locator, input, options);
  }
}
