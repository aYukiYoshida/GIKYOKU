import { Actor, Action } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Reload the current browser page.
 *
 * @group Actions
 * @category to interact
 */
export class Reload extends Action {
  /**
   * Reload the current browser page.
   * @param {Actor} actor Actor performing this action
   * @return {any} Returns the main resource response.
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).reload();
  }

  /**
   * Reload the current browser page.
   * @return {Reload} new Reload instance
   * @category Factory
   */
  public static page(): Reload {
    const instance = new Reload();
    instance.setCallStackInitializeCalledWith({});
    return instance;
  }
}
