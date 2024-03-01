import {
  ConsoleMessage,
  Dialog,
  Download,
  FileChooser,
  Frame,
  Locator,
  Page,
  Request,
  Response,
  WebSocket,
  Worker,
} from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  WaitForLocatorActionOptions,
  WaitForLoadStateActionOptions,
  WaitForUrlActionOptions,
  WaitForEventActionOptions,
} from "../types";

type Mode = "locator" | "loadState" | "url" | "eventOnPage";
type Payload = {
  state?: "load" | "domcontentloaded" | "networkidle";
  url?: string | RegExp | ((url: URL) => boolean);
  locator?: Locator;
  event?: string;
  options?:
    | WaitForLocatorActionOptions
    | WaitForLoadStateActionOptions
    | WaitForUrlActionOptions
    | WaitForEventActionOptions<
        | ConsoleMessage
        | Dialog
        | Download
        | Error
        | FileChooser
        | Frame
        | Page
        | Request
        | Response
        | WebSocket
        | Worker
      >;
};
/**
 * Wait for loading state or a locator or url.
 *
 * @group Actions
 * @category to interact
 */
export class Wait extends Action {
  // only 1 property is active at all times.
  private constructor(
    private mode: Mode,
    private payload: Payload,
  ) {
    super();
  }

  /**
   * wait for either a specified loading state or for a locator to become visible/active or url.
   *
   * @param {Actor} actor the actor object
   * @return {any} Returns when the required load state has been reached.
   * @category called internally
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
    if (this.mode === "locator") {
      if (!this.payload.locator)
        throw new Error("Error: no locator specified for Wait.forLocator()");
      return BrowseTheWeb.as(actor).waitForLocator(
        this.payload.locator,
        this.payload.options,
      );
    }
    if (this.mode === "eventOnPage") {
      if (this.payload.event !== undefined) {
        return BrowseTheWeb.as(actor).waitForEventOnPage(
          this.payload.event,
          this.payload.options,
        );
      }
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
   * ```typescript
   * Wait.forLoadState('networkidle');
   * ```
   * @category Factory
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
   * ```typescript
   * Wait.forUrl('networkidle');
   * ```
   * @category Factory
   */
  public static forUrl(
    url: string | RegExp | ((url: URL) => boolean),
    options?: WaitForUrlActionOptions,
  ): Wait {
    return new Wait("url", { url, options });
  }

  /**
   * Wait for a specific locator to exist.
   *
   * @param {Locator} locator the locator.
   * @param {WaitForLocatorActionOptions} options (optional) advanced locator lookup options.
   * @return {Wait} new Wait instance
   * @example
   * simple call with just locator
   * ```typescript
   * Wait.forLocator('myLocator');
   * ```
   * with options
   * ```typescript
   * Wait.forLocator(
   *   'myLocator', {
   *     hasText: 'myText',
   *     subLocator: ['mySubLocator', { hasText: 'anotherText' } ]
   *   }
   * );
   * ```
   * @category Factory
   */
  public static forLocator(
    locator: Locator,
    options?: WaitForLocatorActionOptions,
  ): Wait {
    return new Wait("locator", { locator, options });
  }

  /**
   * Wait for a specific event.
   *
   * @param {string} event the event to wait for.
   * @param {WaitForEventActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * simple call
   * ```typescript
   * Wait.forEvent<Download>('download');
   * ```
   * @category Factory
   */
  public static forEvent<T>(
    event: string,
    options?: WaitForEventActionOptions<T>,
  ): Wait {
    return new Wait("eventOnPage", { event, options });
  }
}
