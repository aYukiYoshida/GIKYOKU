import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Type specified input into an element specified by a selector string.
 */
export class Type extends Action {
  private constructor(
    private selector: Selector,
    private input: string,
    private options?: SelectorOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and fill it.
   *
   * @param {Actor} actor the actor which is used
   * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
   */
  public async performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).type(this.selector, this.input, this.options);
  }

  /**
   * Finds the specified selector and will it with the specified input string.
   *
   * @param {Selector} selector the selector.
   * @param {string} input the input.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Type} new Type instance
   * @example
   * // simple call with just selector
   * Type.in('mySelector', 'myInput');
   * // or with options
   * Type.in(
   *   'mySelector',
   *   'myInput', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static in(
    selector: Selector,
    input: string,
    options?: SelectorOptions,
  ): Type {
    return new Type(selector, input, options);
  }
}
