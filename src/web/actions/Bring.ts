import { Page } from "@playwright/test";
import { Actor, Action } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

export class Bring extends Action {
  private constructor(private page: Page) {
    super();
  }

  public async performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).bringToFront(this.page);
  }

  /**
   * Brings page to front to activate it.
   *
   * @param {Page} page Page to bring to front
   * @return {Bring} new Bring instance
   */
  public static toFront(page: Page): Bring {
    return new Bring(page);
  }
}
