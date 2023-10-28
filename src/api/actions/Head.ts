import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response } from "../types";

import { ARequest } from "./ARequest";

/**
 * Send a HTTP HEAD Request.
 *
 * @group Actions
 */
export class Head extends ARequest {
  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP HEAD request to the specified url.
   * Optionally it is possible to chain definitions for headers as well as the expected response type.
   *
   * @param {Actor} actor the actor
   * @return {Response} the response
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.GET,
      this.url,
      this.headers,
      "none",
    );
  }

  /**
   * Send a HTTP head request to the specified url.
   *
   * @param {string} url the URL of the target.
   * @return {Head} new instance
   */
  public static from(url: string): Head {
    return new Head(url);
  }

  /**
   * Add headers to the HTTP HEAD request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Head} this instance
   * @example
   * simple request
   * ```typescript
   * Head.from('https://my-fancy-url.com');
   * ```
   * with chained definitions
   * ```typescript
   * Head.from('https://my-fancy-url.com')
   *     // add headers
   *     .withHeaders({
   *         key: value,
   *     })
   *     // define expected response format
   *     .withResponseFormat('text');
   * ```
   * @category Factory
   */
  public withHeaders(headers: Headers): Head {
    this.headers = headers;
    return this;
  }
}
