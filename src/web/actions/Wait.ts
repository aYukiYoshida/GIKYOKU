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
import { PageFunction } from "playwright-core/types/structs";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import {
  WaitForLocatorActionOptions,
  WaitForLoadStateActionOptions,
  WaitForUrlActionOptions,
  WaitForRequestActionOptions,
  WaitForResponseActionOptions,
  WaitForEventActionOptions,
  WaitForFunctionActionOptions,
} from "../types";

type Mode =
  | "locator"
  | "loadState"
  | "url"
  | "function"
  | "request"
  | "response"
  | "eventOnPage"
  | "event";
type Payload = {
  state?: "load" | "domcontentloaded" | "networkidle";
  url?: string | RegExp | ((url: URL) => boolean);
  requestUrlOrPredict?:
    | string
    | RegExp
    | ((request: Request) => boolean | Promise<boolean>);
  responseUrlOrPredict?:
    | string
    | RegExp
    | ((request: Response) => boolean | Promise<boolean>);
  locator?: Locator;
  event?: string;
  pageFunction?: PageFunction<any, any>;
  argument?: any;
  options?:
    | WaitForLocatorActionOptions
    | WaitForLoadStateActionOptions
    | WaitForUrlActionOptions
    | WaitForRequestActionOptions
    | WaitForResponseActionOptions
    | WaitForFunctionActionOptions
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
    if (this.mode === "request") {
      if (!this.payload.requestUrlOrPredict)
        throw new Error(
          "Error: no urlOrPredict specified for Wait.forRequest()",
        );
      return BrowseTheWeb.as(actor).waitForRequest(
        this.payload.requestUrlOrPredict,
        this.payload.options,
      );
    }
    if (this.mode === "response") {
      if (!this.payload.responseUrlOrPredict)
        throw new Error(
          "Error: no urlOrPredict specified for Wait.forResponse()",
        );
      return BrowseTheWeb.as(actor).waitForResponse(
        this.payload.responseUrlOrPredict,
        this.payload.options,
      );
    }
    if (this.mode === "function") {
      if (!this.payload.pageFunction)
        throw new Error(
          "Error: no pageFunction specified for Wait.forFunction()",
        );
      return BrowseTheWeb.as(actor).waitForFunction(
        this.payload.pageFunction,
        this.payload.argument,
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
   * Wait for request matching the url or predicate.
   *
   * @param {string} urlOrPredicate url or predicate to wait for
   * @param {WaitForRequestActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * ```typescript
   * Wait.forRequest('example.com');
   * ```
   * @category Factory
   */
  public static forRequest(
    urlOrPredicate:
      | string
      | RegExp
      | ((request: Request) => boolean | Promise<boolean>),
    options?: WaitForRequestActionOptions,
  ): Wait {
    const instance = new Wait("request", {
      requestUrlOrPredict: urlOrPredicate,
      options,
    });
    instance.setCallStackInitializeCalledWith({ urlOrPredicate, options });
    return instance;
  }

  /**
   * Wait for response matching the url or predicate.
   *
   * @param {string} urlOrPredicate url or predicate to wait for
   * @param {WaitForResponseActionOptions} options
   * @return {Wait} new Wait instance
   * @example
   * ```typescript
   * Wait.forRequest('example.com');
   * ```
   * @category Factory
   */
  public static forResponse(
    urlOrPredicate:
      | string
      | RegExp
      | ((response: Response) => boolean | Promise<boolean>),
    options?: WaitForResponseActionOptions,
  ): Wait {
    const instance = new Wait("response", {
      responseUrlOrPredict: urlOrPredicate,
      options,
    });
    instance.setCallStackInitializeCalledWith({ urlOrPredicate, options });
    return instance;
  }

  /**
   * Wait until the
   * [`pageFunction`](https://playwright.dev/docs/api/class-page#page-wait-for-function-option-expression) returns a
   * truthy value. It resolves to a JSHandle of the truthy value.
   * @param pageFunction Function to be evaluated in the page context.
   * @param argument Optional argument to pass to
   * [`pageFunction`](https://playwright.dev/docs/api/class-page#page-wait-for-function-option-expression).
   * @param options
   * @return {Wait} new Wait instance
   * @example
   * ```typescript
   * const selector = '.foo';
   * await actor.attemptsTo(
   *   Wait.forFunction(
   *     (selector) => !!document.querySelector(selector),
   *     selector
   *   );
   * );
   * ```
   * @category Factory
   */
  public static forFunction<R, Arg>(
    pageFunction: PageFunction<Arg, R>,
    argument?: Arg,
    options?: WaitForFunctionActionOptions,
  ): Wait {
    const instance = new Wait("function", {
      pageFunction,
      argument,
      options,
    });
    instance.setCallStackInitializeCalledWith({
      pageFunction,
      argument,
      options,
    });
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
