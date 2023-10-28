import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Remove either Session Storage Items or Local Storage Items from the Browser.
 *
 * @group Actions
 * @category related to cookies
 */
export class Remove extends Action {
  private constructor(
    private mode: "sessionStorage" | "localStorage",
    private payload?: any,
  ) {
    super();
  }

  /**
   * wait for either a specified loading state or for a locator to become visible/active.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} Returns the value of the `pageFunction` invocation.
   * @category called internally
   */
  public performAs(actor: Actor): Promise<any> {
    if (this.mode === "sessionStorage") {
      return BrowseTheWeb.as(actor).removeSessionStorageItem(this.payload);
    }
    if (this.mode === "localStorage") {
      return BrowseTheWeb.as(actor).removeLocalStorageItem(this.payload);
    }
    throw new Error("Error: no match for Remove.performAs()!");
  }

  /**
   * Remove a session storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {Remove} new Remove instance for session storage
   * @example
   * ```typescript
   * Remove.sessionStorageItem('some key');
   * ```
   * @category Factory
   */
  public static sessionStorageItem(key: string): Remove {
    return new Remove("sessionStorage", key);
  }

  /**
   * Remove a local storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {Remove} new Remove instance for local storage
   * @example
   * ```typescript
   * Remove.localStorageItem('some key');
   * ```
   * @category Factory
   */
  public static localStorageItem(key: string): Remove {
    return new Remove("localStorage", key);
  }
}
