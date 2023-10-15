import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions, ClickActionOptions } from "../types";

/**
 * @group Actions
 *
 * Click on an element specified by a selector string.
 */
export class Click extends Action {
  private constructor(
    private selector: Selector,
    private options?: SelectorOptions & ClickActionOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after clicking the element
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).click(this.selector, this.options);
  }

  /**
   * specify which element should be clicked on
   *
   * @param {Selector} selector the string representing the selector.
   * @param {SelectorOptions & ClickActionOptions} options (optional): advanced selector lookup options.
   * @return {Click} new Click instance
   * @example
   * // simple call with just selector
   * Click.on('mySelector');
   * // or with options
   * Click.on(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static on(
    selector: Selector,
    options?: SelectorOptions & ClickActionOptions,
  ): Click {
    return new Click(selector, options);
  }
}
