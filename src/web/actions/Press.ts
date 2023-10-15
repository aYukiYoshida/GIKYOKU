import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { PressActionOptions, Selector, SelectorOptions } from "../types";

/**
 * @group Actions
 *
 * Press the specified key on the keyboard.
 */
export class Press extends Action {
  private constructor(
    private input: string,
    private action: {
      selector?: Selector;
      options?: SelectorOptions & PressActionOptions;
      sequential: boolean;
    },
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
    if (this.action.sequential) {
      if (!this.action.selector)
        throw new Error("Error: no selector specified for Press.performAs()");
      return BrowseTheWeb.as(actor).pressSequentially(
        this.action.selector,
        this.input,
        this.action.options,
      );
    } else {
      return BrowseTheWeb.as(actor).press(this.input, this.action.options);
    }
  }

  /**
   * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
   *
   * @param {string} keys the key(s) to press.
   * @param {PressActionOptions} options
   * @return {Press} new Press instance
   * @example
   * // single key
   * Press.key('A');
   * // multiple keys
   * Press.key('Control+A')
   */
  public static key(keys: string, options?: PressActionOptions): Press {
    return new Press(keys, { options, sequential: false });
  }

  /**
   * Press the specified keys sequentially for each string character
   * To press a special key, like Control or ArrowDown, use {@link key}.
   * @param {Selector} selector the selector.
   * @param {string} input the keys of characters to press.
   * @param {SelectorOptions & PressActionOptions} options
   * @return {Press} new Press instance
   * @example
   * // keys of characters
   * Press.characters('abcdefghijklmnopqrstuvwxyz');
   */
  public static characters(
    selector: Selector,
    input: string,
    options?: SelectorOptions & PressActionOptions,
  ): Press {
    return new Press(input, { selector, options, sequential: true });
  }
}
