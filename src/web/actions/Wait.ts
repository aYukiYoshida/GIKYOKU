import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions, WaitActionOptions } from "../types";

type Payload = {
  state?: "load" | "domcontentloaded" | "networkidle";
  selector?: Selector;
  options?: SelectorOptions;
};
/**
 * @group Actions
 *
 * Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends Action {
  // the object that determines what to wait for (loading state, selector or selector == expected).
  // only 1 property is active at all times.
  private action: {
    mode: "selector" | "loadState";
    payload: Payload;
  };

  private constructor(action: {
    mode: "selector" | "loadState";
    payload: Payload;
  }) {
    super();
    this.action = action;
  }

  /**
   * wait for either a specified loading state or for a selector to become visible/active.
   *
   * @param {Actor} actor the actor object
   * @return {any} Returns when the required load state has been reached.
   */
  public performAs(actor: Actor): Promise<any> {
    if (this.action.mode === "loadState") {
      if (!this.action.payload.state)
        throw new Error("Error: no state specified for Wait.performAs()");
      return BrowseTheWeb.as(actor).waitForLoadState(this.action.payload.state);
    }
    if (this.action.mode === "selector") {
      if (!this.action.payload.selector)
        throw new Error("Error: no selector specified for Wait.performAs()");
      return BrowseTheWeb.as(actor).waitForSelector(
        this.action.payload.selector,
        this.action.payload.options,
      );
    }
    throw new Error("Error: no match for Wait.performAs()!");
  }

  /**
   * Wait for a specific status of the page.
   *
   * @param {string} state either 'load', 'domcontentloaded' or 'networkidle'
   * @param {WaitActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * Wait.forLoadState('networkidle');
   */
  public static forLoadState(
    state: "load" | "domcontentloaded" | "networkidle",
    options?: WaitActionOptions,
  ): Wait {
    return new Wait({ mode: "loadState", payload: { state, options } });
  }

  /**
   * Wait for a specific selector to exist.
   *
   * @param {Selector} selector the selector.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Wait} new Wait instance
   * @example
   * // simple call with just selector
   * Wait.forSelector('mySelector');
   * // or with options
   * Wait.forSelector(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public static forSelector(
    selector: Selector,
    options?: SelectorOptions,
  ): Wait {
    return new Wait({ mode: "selector", payload: { selector, options } });
  }
}
