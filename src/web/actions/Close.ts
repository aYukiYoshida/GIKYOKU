import { Page } from "@playwright/test";
import { Actor, Action } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Close the page.
 *
 * @group Actions
 * @category to interact
 */
export class Close extends Action {
  private constructor(private page: Page) {
    super();
  }

  /**
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).close(this.page);
  }

  /**
   * Closes page to front.
   *
   * @param {Page} page Page to bring to front
   * @return {Close} new Close instance
   * @category Factory
   */
  public static page(page: Page): Close {
    const instance = new Close(page);
    instance.setCallStackInitializeCalledWith({ page });
    return instance;
  }
}
