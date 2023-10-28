import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { PressActionOptions } from "../types";

/**
 * Press the specified key on the keyboard.
 *
 * @group Actions
 * @category to interact
 */
export class Press extends Action {
  private constructor(
    private input: string,
    private action: {
      locator?: Locator;
      options?: PressActionOptions;
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
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    if (this.action.sequential) {
      if (!this.action.locator)
        throw new Error("Error: no locator specified for Press.performAs()");
      return BrowseTheWeb.as(actor).pressSequentially(
        this.action.locator,
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
   * @param {PressActionOptions} options (optional) options for the press action.
   * @return {Press} new Press instance
   * @example
   * single key
   * ```typescript
   * Press.key('A');
   * ```
   * multiple keys
   * ```typescript
   * Press.key('Control+A')
   * ```
   * @category Factory
   */
  public static key(keys: string, options?: PressActionOptions): Press {
    return new Press(keys, { options, sequential: false });
  }

  /**
   * Press the specified keys sequentially for each string character
   * To press a special key, like Control or ArrowDown, use {@link key}.
   * @param {Locator} locator the locator.
   * @param {string} input the keys of characters to press.
   * @param {PressActionOptions} options (optional) options for the press action.
   * @return {Press} new Press instance
   * @example
   * keys of characters
   * ```typescript
   * Press.characters('abcdefghijklmnopqrstuvwxyz');
   * ```
   * @category Factory
   */
  public static characters(
    locator: Locator,
    input: string,
    options?: PressActionOptions,
  ): Press {
    return new Press(input, { locator, options, sequential: true });
  }
}
