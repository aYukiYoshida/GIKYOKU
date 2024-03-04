import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Save Cookies and local storage snapshot.
 *
 * @group Actions
 * @category related to storage
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
   * @category called internally
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
   * @category Factory
   */
  public static storageState(path: string): Save {
    const instance = new Save(path);
    instance.setCallStackInitializeCalledWith({ path });
    return instance;
  }
}
