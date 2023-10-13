import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Press the specified key on the keyboard.
 */
export class Press extends Action {
  private constructor(
    private input: string,
    private selector: Selector = "",
    private options?: SelectorOptions,
    private sequential: boolean = false,
  ) {
    super();
  }

  /**
   * Press the specified key.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
   */
  public async performAs(actor: Actor): Promise<void> {
    if (this.sequential) {
      return BrowseTheWeb.as(actor).pressSequentially(
        this.selector,
        this.input,
        this.options,
      );
    } else {
      return BrowseTheWeb.as(actor).press(this.input);
    }
  }

  /**
   * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
   *
   * @param {string} keys the key(s) to press.
   * @return {Press} new Press instance
   * @example
   * // single key
   * Press.key('A');
   * // multiple keys
   * Press.key('Control+A')
   */
  public static key(keys: string): Press {
    return new Press(keys);
  }

  /**
   * Press the specified keys sequentially for each string character
   * To press a special key, like Control or ArrowDown, use {@link key}.
   * @param {Selector} selector the selector.
   * @param {string} input the keys of characters to press.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Press} new Press instance
   * @example
   * // keys of characters
   * Press.characters('abcdefghijklmnopqrstuvwxyz');
   */
  public static characters(
    selector: Selector,
    input: string,
    options?: SelectorOptions,
  ): Press {
    return new Press(input, selector, options, true);
  }
}
