import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { HoverActionOptions, Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Hover over an element specified by a selector string.
 */
export class Hover extends Action {
  private constructor(
    private selector: Selector,
    private options?: SelectorOptions & HoverActionOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and hover over it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns when hovered over the element
   */
  public performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).hover(this.selector, this.options);
  }

  /**
   * Specify which selector should be hovered over
   *
   * @param {Selector} selector The selector that should be hovered over.
   * @param {SelectorOptions & HoverActionOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
   * @return {Hover} new Hover instance
   * @example
   * // simple call with just selector
   * Hover.over('mySelector');
   * // or with options
   * Hover.over('mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *     modifiers: ['Alt', 'Shift']
   * });
   */
  public static over(
    selector: Selector,
    options?: SelectorOptions & HoverActionOptions,
  ): Hover {
    return new Hover(selector, options);
  }
}
