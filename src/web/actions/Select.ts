import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { SelectActionOptions, Selector, SelectorOptions } from "../types";
/**
 * @group Actions
 *
 * Set the value of a Selector of type select to the given option.
 */
export class Select extends Action {
  private constructor(
    private selector: Selector,
    private option: string | { value?: string; label?: string; index?: number },
    private options?: SelectorOptions & SelectActionOptions,
  ) {
    super();
  }

  /**
   * find the specified selector and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} This method checks, waits until all specified options are present in the `<select>` element and selects these options.
   */
  public async performAs(actor: Actor): Promise<any> {
    await BrowseTheWeb.as(actor).selectOption(
      this.selector,
      this.option,
      this.options,
    );
  }

  /**
   * Set the value of a Selector of type select to the given option.
   *
   * @param {Selector} selector the string representing the (select) selector.
   * @param {string|number} option optionLabel the label of the option.
   * @param {SelectorOptions & SelectActionOptions} options (optional): advanced selector lookup options.
   * @return {Select} new Select instance
   * @example
   * // simple call with just selector
   * Select.option('mySelector', 'myOptionLabel');
   * // or with options for select
   * Select.option(
   *   'mySelector',
   *   'myOptionLabel', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static option(
    selector: Selector,
    option: string | { value?: string; label?: string; index?: number },
    options?: SelectorOptions & SelectActionOptions,
  ): Select {
    return new Select(selector, option, options);
  }
}
