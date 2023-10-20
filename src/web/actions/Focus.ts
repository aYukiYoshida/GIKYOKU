import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Focus on an element specified by a selector string.
 */
export class Focus extends Action {
  private constructor(
    private selector: Selector,
    private options?: SelectorOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after focusing the element
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).focus(this.selector, this.options);
  }

  /**
   * specify which element should be focused on
   *
   * @param {Selector} selector the string representing the selector.
   * @param {SelectorOptions} options (optional): advanced selector lookup options.
   * @return {Focus} new Focus instance
   * @example <caption> simple call with just selector </caption>
   * Click.on('mySelector');
   * @example <caption> with options </caption>
   * Click.on(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static on(selector: Selector, options?: SelectorOptions): Focus {
    return new Focus(selector, options);
  }
}
