import {
  BrowserContext,
  ConsoleMessage,
  Dialog,
  Download,
  FileChooser,
  Frame,
  Locator,
  Page,
  Request,
  Response,
  WebError,
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

type Mode = "locator" | "loadState" | "url" | "eventOnPage" | "event";
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
        | BrowserContext
        | ConsoleMessage
        | Dialog
        | Download
        | Error
        | FileChooser
        | Frame
        | Page
        | Request
        | Response
        | WebError
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
    if (this.mode === "event") {
      if (this.payload.event !== undefined) {
        return BrowseTheWeb.as(actor).waitForEvent(
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
    const instance = new Wait("loadState", { state, options });
    instance.setCallStackInitializeCalledWith({ state, options });
    return instance;
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
    const instance = new Wait("url", { url, options });
    instance.setCallStackInitializeCalledWith({ url, options });
    return instance;
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
    const instance = new Wait("locator", { locator, options });
    instance.setCallStackInitializeCalledWith({ locator, options });
    return instance;
  }

  /**
   * Wait for a specific event on page.
   *
   * @param {string} event the event on page to wait for.
   * @param {WaitForEventActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * simple call
   * ```typescript
   * Wait.forEventOnPage<Download>('download');
   * ```
   * @category Factory
   */
  public static forEventOnPage<T>(
    event: string,
    options?: WaitForEventActionOptions<T>,
  ): Wait {
    const instance = new Wait("eventOnPage", { event, options });
    instance.setCallStackInitializeCalledWith({ event, options });
    return instance;
  }

  /**
   * Wait for a specific event on page.
   *
   * @param {string} event the event on browser to wait for.
   * @param {WaitForEventActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * simple call
   * ```typescript
   * Wait.forEvent<Page>('page');
   * ```
   * @category Factory
   */
  public static forEvent<T>(
    event: string,
    options?: WaitForEventActionOptions<T>,
  ): Wait {
    const instance = new Wait("event", { event, options });
    instance.setCallStackInitializeCalledWith({ event, options });
    return instance;
  }
}
