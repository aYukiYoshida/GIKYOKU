import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  Selector,
  SelectorOptions,
  WaitForLoadStateActionOptions,
  WaitForUrlActionOptions,
} from "../types";

type Mode = "selector" | "loadState" | "url";
type Payload = {
  state?: "load" | "domcontentloaded" | "networkidle";
  url?: string | RegExp | ((url: URL) => boolean);
  selector?: Selector;
  options?:
    | SelectorOptions
    | WaitForLoadStateActionOptions
    | WaitForUrlActionOptions;
};
/**
 * @group Actions
 *
 * Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends Action {
  // the object that determines what to wait for (loading state, selector or selector == expected).
  // only 1 property is active at all times.
  private constructor(
    private mode: Mode,
    private payload: Payload,
  ) {
    super();
  }

  /**
   * wait for either a specified loading state or for a selector to become visible/active.
   *
   * @param {Actor} actor the actor object
   * @return {any} Returns when the required load state has been reached.
   */
  public performAs(actor: Actor): Promise<any> {
    if (this.mode === "loadState") {
      if (!this.payload.state)
        throw new Error("Error: no state specified for Wait.forLoadState()");
      return BrowseTheWeb.as(actor).waitForLoadState(
        this.payload.state,
        this.payload.options,
      );
    }
    if (this.mode === "url") {
      if (!this.payload.url)
        throw new Error("Error: no url specified for Wait.forUrl()");
      return BrowseTheWeb.as(actor).waitForUrl(
        this.payload.url,
        this.payload.options,
      );
    }
    if (this.mode === "selector") {
      if (!this.payload.selector)
        throw new Error("Error: no selector specified for Wait.forSelector()");
      return BrowseTheWeb.as(actor).waitForSelector(
        this.payload.selector,
        this.payload.options,
      );
    }
    throw new Error("Error: no match for Wait.performAs()!");
  }

  /**
   * Wait for a specific status of the page.
   *
   * @param {string} state either 'load', 'domcontentloaded' or 'networkidle'
   * @param {WaitForLoadStateActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * Wait.forLoadState('networkidle');
   */
  public static forLoadState(
    state: "load" | "domcontentloaded" | "networkidle",
    options?: WaitForLoadStateActionOptions,
  ): Wait {
    return new Wait("loadState", { state, options });
  }

  /**
   * Wait for the page specified url.
   *
   * @param {string} url url to wait for
   * @param {WaitForUrlActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * Wait.forLoadState('networkidle');
   */
  public static forUrl(
    url: string | RegExp | ((url: URL) => boolean),
    options?: WaitForUrlActionOptions,
  ): Wait {
    return new Wait("url", { url, options });
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
    return new Wait("selector", { selector, options });
  }
}
