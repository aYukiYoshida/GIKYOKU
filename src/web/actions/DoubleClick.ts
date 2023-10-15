import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { DblclickActionOptions, Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Click on an element specified by a selector string.
 */
export class DoubleClick extends Action {
  // eslint-disable-next-line no-useless-constructor
  private constructor(
    private selector: Selector,
    private options?: SelectorOptions & DblclickActionOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after double clicking the element
   */
  public async performAs(actor: Actor): Promise<void> {
    await BrowseTheWeb.as(actor).dblclick(this.selector, this.options);
  }

  /**
   * specify which element should be double-clicked on
   *
   * @param {Selector} selector the string representing the selector.
   * @param {SelectorOptions & DblclickActionOptions} options (optional): advanced selector lookup options.
   * @return {DoubleClick} new DoubleClick instance
   * @example
   * // simple call with just selector
   * DoubleClick.on('mySelector');
   * // or with options
   * DoubleClick.on(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static on(
    selector: Selector,
    options?: SelectorOptions & DblclickActionOptions,
  ): DoubleClick {
    return new DoubleClick(selector, options);
  }
}
