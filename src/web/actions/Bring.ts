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
  private page: Page | undefined;
  private url: string | RegExp | undefined;
  private constructor(
    private options: {
      page?: Page;
      url?: string | RegExp;
    },
  ) {
    super();
    this.page = options.page;
    this.url = options.url;
  }

  /**
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<any> {
    if (this.url) {
      const page = BrowseTheWeb.as(actor).getPage({ url: this.url });
      return BrowseTheWeb.as(actor).bringToFront(page);
    }
    if (this.page) {
      return BrowseTheWeb.as(actor).bringToFront(this.page);
    }
    throw new Error("Either 'page' or 'url' must be provided to Bring action");
  }

  /**
   * Brings page to front.
   *
   * @param {Page} page Page to bring to front
   * @return {Bring} new Bring instance
   * @category Factory
   */
  public static toFront(page: Page): Bring {
    const instance = new Bring({ page });
    instance.setCallStackInitializeCalledWith({ page });
    return instance;
  }

  public static toFrontByUrl(url: string | RegExp): Bring {
    const instance = new Bring({ url });
    instance.setCallStackInitializeCalledWith({ url });
    return instance;
  }
}
