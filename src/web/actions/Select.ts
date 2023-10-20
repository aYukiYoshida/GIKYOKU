import { Locator } from "@playwright/test";
import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { SelectActionOptions } from "../types";

/**
 * Set the value of a Locator of type select to the given option.
 *
 * @group Actions
 */
export class Select extends Action {
  private constructor(
    private locator: Locator,
    private values:
      | string
      | Array<string>
      | {
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }
      | Array<{
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }>,
    private options?: SelectActionOptions,
  ) {
    super();
  }

  /**
   * find the specified locator and click on it.
   *
   * @param {Actor} actor Actor performing this action
   * @return {any} This method checks, waits until all specified options are present in the `<select>` element and selects these options.
   */
  public async performAs(actor: Actor): Promise<any> {
    await BrowseTheWeb.as(actor).selectOption(
      this.locator,
      this.values,
      this.options,
    );
  }

  /**
   * Set the value of a Locator of type select to the given option.
   *
   * @param {Locator} locator the string representing the (select) locator.
   * @param values options to select.
   * @param {SelectActionOptions} options (optional) options for the select action.
   * @return {Select} new Select instance
   * @example
   * simple call with just locator
   * ```typescript
   * Select.option(
   *   page.locator('myLocator'),
   *   'myOptionLabel'
   * );
   * with options for select
   * ```typescript
   * Select.option(
   *   page.locator('myLocator'),
   *   'myOptionLabel',
   *   { timeout: 3000 }
   * );
   * ```
   */
  public static option(
    locator: Locator,
    values:
      | string
      | Array<string>
      | {
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }
      | Array<{
          /**
           * Matches by `option.value`. Optional.
           */
          value?: string;

          /**
           * Matches by `option.label`. Optional.
           */
          label?: string;

          /**
           * Matches by the index. Optional.
           */
          index?: number;
        }>,
    options?: SelectActionOptions,
  ): Select {
    return new Select(locator, values, options);
  }
}
