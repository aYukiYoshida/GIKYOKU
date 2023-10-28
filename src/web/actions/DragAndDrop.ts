import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { DragAndDropActionOptions } from "../types";

/**
 * DragAndDrop an element specified by a locator and drop it on an element specified by another locator.
 *
 * @group Actions
 * @category to interact
 */
export class DragAndDrop extends Action {
  private constructor(
    private sourceLocator: Locator,
    private targetLocator: Locator,
    private options?: DragAndDropActionOptions,
  ) {
    super();
  }

  /**
   * drag the specified locator and drop it on the target.
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after dragging the locator to another target locator or target position
   * @category called internally
   */
  public performAs(actor: Actor): Promise<void> {
    return BrowseTheWeb.as(actor).dragAndDrop(
      this.sourceLocator,
      this.targetLocator,
      this.options,
    );
  }

  /**
   * Drag the specified source element to the specified target element and drop it.
   *
   * @param {Locator} sourceLocator the locator of the source element.
   * @param {Locator} targetLocator the locator of the target element.
   * @param {LocatorOptions} options (optional) options for the drag and drop action.
   * @return {DragAndDrop} new DragAndDrop instance
   * @example
   * simple call with just locator
   * ```typescript
   * DragAndDrop.execute(
   *   page.locator('sourceLocator'),
   *   page.locator('targetLocator')
   * );
   * ```
   * with options
   * ```typescript
   * DragAndDrop.execute(
   *   page.locator('sourceLocator'),
   *   page.locator('targetLocator'),
   *   { timeout: 3000 }
   * );
   * ```
   * @category Factory
   */
  public static execute(
    sourceLocator: Locator,
    targetLocator: Locator,
    options?: DragAndDropActionOptions,
  ): DragAndDrop {
    return new DragAndDrop(sourceLocator, targetLocator, options);
  }
}
