import { Actor, Action } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Reload the current browser page.
 *
 * @group Actions
 */
export class Reload extends Action {
  public async performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).reload();
  }

  /**
   * Reload the current browser page.
   */
  public static page(): Reload {
    return new Reload();
  }
}
