import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Get either Cookies, Session Storage Items or Local Storage Items from the Browser.
 *
 * @group Actions
 * @category related to cookies
 * @category related to storage
 */
export class Get extends Action {
  private constructor(
    private mode: "cookies" | "sessionStorage" | "localStorage",
    private payload: any,
  ) {
    super();
  }

  /**
   * wait for either a specified loading state or for a locator to become visible/active.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} Returns cookies, session storage items or local storage items
   * @category called internally
   */
  public performAs(actor: Actor): Promise<any> {
    if (this.mode === "cookies") {
      return BrowseTheWeb.as(actor).getCookies(this.payload);
    }
    if (this.mode === "sessionStorage") {
      return BrowseTheWeb.as(actor).getSessionStorageItem(this.payload);
    }
    if (this.mode === "localStorage") {
      return BrowseTheWeb.as(actor).getLocalStorageItem(this.payload);
    }
    throw new Error("Error: no match for Get.performAs()!");
  }

  /**
   * Get the specified cookies.
   *
   * @param {string} urls (optional): If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, this all cookies are returned.
   * @return {Get} new Get instance for cookies
   * @example
   * get all cookies
   * ```typescript
   * Get.cookies();
   * ```
   * get cookies for a single domain
   * ```typescript
   * Get.cookies('https://www.myapp.com');
   * ```
   * get cookies for two domains
   * ```typescript
   * Get.cookies(['https://www.myapp.com', 'https://www.another-app.com']);
   * ```
   * @category Factory
   */
  public static cookies(urls?: string | string[] | undefined): Get {
    const instance = new Get("cookies", urls);
    instance.setCallStackInitializeCalledWith({ urls });
    return instance;
  }

  /**
   * Get a session storage item.
   *
   * @param {string} key the key that specifies the item.
   * @return {Get} new Get instance for session storage
   * @example
   * ```typescript
   * Get.sessionStorageItem('some key');
   * ```
   * @category Factory
   */
  public static sessionStorageItem(key: string): Get {
    const instance = new Get("sessionStorage", key);
    instance.setCallStackInitializeCalledWith({ key });
    return instance;
  }

  /**
   * Get a local storage item.
   *
   * @param {string} key the key that specifies the item.
   * @return {Get} new Get instance for local storage
   * @example
   * ```typescript
   * Get.localStorageItem('some key');
   * ```
   * @category Factory
   */
  public static localStorageItem(key: string): Get {
    const instance = new Get("localStorage", key);
    instance.setCallStackInitializeCalledWith({ key });
    return instance;
  }
}
