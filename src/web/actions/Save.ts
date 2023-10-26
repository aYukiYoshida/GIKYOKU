import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Save Cookies and local storage snapshot.
 *
 * @group Actions
 */
export class Save extends Action {
  private constructor(private path: string) {
    super();
  }

  /**
   * save the cookies and local storage.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} cookies and local storage snapshot.
   */
  public performAs(actor: Actor): Promise<any> {
    return BrowseTheWeb.as(actor).saveStorageState(this.path);
  }

  /**
   * Save the storage state.
   *
   * @param {string} path the file path to save the storage state to.
   * @return {Save} new Save instance
   * @example
   * ```typescript
   * actor.attemptsTo(
   *   Save.storageState('/tmp/storage.json')
   * );
   * ```
   */
  public static storageState(path: string): Save {
    return new Save(path);
  }
}
