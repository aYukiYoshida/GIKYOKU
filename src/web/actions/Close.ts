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
  private page: Page | undefined;
  private url: string | RegExp | undefined;
  private constructor(options: { page?: Page; url?: string | RegExp }) {
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
      return BrowseTheWeb.as(actor).close(page);
    }
    if (this.page) {
      return BrowseTheWeb.as(actor).close(this.page);
    }
    throw new Error("Either 'page' must be provided to Close action");
  }

  /**
   * Close page.
   *
   * @param {Page} page Page to close
   * @return {Close} new Close instance
   * @category Factory
   */
  public static page(page: Page): Close {
    const instance = new Close({ page });
    instance.setCallStackInitializeCalledWith({ page });
    return instance;
  }

  /**
   * Close page by URL.
   *
   * @param {string | RegExp} url URL of the page to close
   * @return {Close} new Close instance
   * @category Factory
   */
  public static pageByUrl(url: string | RegExp): Close {
    const instance = new Close({ url });
    instance.setCallStackInitializeCalledWith({ url });
    return instance;
  }
}
