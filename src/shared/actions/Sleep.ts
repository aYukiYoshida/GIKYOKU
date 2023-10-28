import { Action } from "@testla/screenplay";

/**
 * Pauses further test execution for a while. It does not require any particular Abilities.
 *
 * @group Actions
 */
export class Sleep extends Action {
  private constructor(private ms: number) {
    super();
  }

  /**
   * Pause the execution of further test steps for a given interval in milliseconds.
   * @return {void} void
   * @category called internally
   */
  public async performAs(): Promise<void> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve): any => setTimeout(resolve, this.ms));
  }

  /**
   * Pause the execution of further test steps for a given interval in milliseconds.
   *
   * @param {number} ms interval in milliseconds.
   * @return {Sleep} new Sleep instance
   * @example
   * ```typescript
   * Sleep.for(5000);
   * ```
   * @category Factory
   */
  public static for(ms: number): Sleep {
    return new Sleep(ms);
  }
}
