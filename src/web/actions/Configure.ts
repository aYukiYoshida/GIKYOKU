import { Action, Actor } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Geolocation } from "../types";

/**
 * Configure
 *
 * @group Actions
 * @category to interact
 */
export class Configure extends Action {
  private geolocation?: null | Geolocation;
  private network?: "online" | "offline";
  private constructor(
    private mode: "geolocation" | "network",
    options: {
      geolocation?: null | Geolocation;
      network?: "online" | "offline";
    },
  ) {
    super();
    this.mode = mode;
    this.geolocation = options.geolocation;
    this.network = options.network;
  }

  /**
   * configure the context.
   *
   * @param {Actor} actor Actor performing this action
   * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<void> {
    if (this.mode === "geolocation" && this.geolocation !== undefined) {
      return await BrowseTheWeb.as(actor).setGeolocation(this.geolocation);
    }
    if (this.mode === "network" && this.network !== undefined) {
      const offline = this.network === "offline";
      return await BrowseTheWeb.as(actor).setOffline(offline);
    }
    throw new Error("Error: no match for Configure.performAs()");
  }

  /**
   * Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.
   *
   * @param {null|Geolocation} geolocation the geolocation.
   * @return {Configure} new Configure instance
   * @example
   * ```typescript
   * Configure.geolocation(
   *   { latitude: 59.95, longitude: 30.31667 }
   * );
   * ```
   * @category Factory
   */
  public static geolocation(geolocation: null | Geolocation): Configure {
    const instance = new Configure("geolocation", { geolocation });
    instance.setCallStackInitializeCalledWith({ geolocation });
    return instance;
  }

  /**
   * Emulates the context's network being offline or online.
   * @param {"online" | "offline"} network the network condition.
   * @return {Configure} new Configure instance
   * @example
   * ```typescript
   * Configure.network("offline");
   * ```
   * @category Factory
   */
  public static network(network: "online" | "offline"): Configure {
    const instance = new Configure("network", { network });
    instance.setCallStackInitializeCalledWith({ network });
    return instance;
  }
}
