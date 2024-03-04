import { Page } from "@playwright/test";
import { Actor, Action } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Bring the page to front to activate it.
 *
 * @group Actions
 * @category to interact
 */
export class Bring extends Action {
  private constructor(private page: Page) {
    super();
  }

  /**
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).bringToFront(this.page);
  }

  /**
   * Brings page to front.
   *
   * @param {Page} page Page to bring to front
   * @return {Bring} new Bring instance
   * @category Factory
   */
  public static toFront(page: Page): Bring {
    const instance = new Bring(page);
    instance.setCallStackInitializeCalledWith({ page });
    return instance;
  }
}
