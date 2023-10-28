import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * Send a HTTP GET Request.
 *
 * @group Actions
 */
export class Get extends ARequest {
  private responseBodyFormat: ResponseBodyFormat = "json";

  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP GET request to the specified url.
   *
   * @param {Actor} actor the actor object
   * @return {Response} the response
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.GET,
      this.url,
      this.headers,
      this.responseBodyFormat,
    );
  }

  /**
   * Send a HTTP GET request to the specified url.
   * Optionally it is possible to chain definitions for headers as well as the expected response type.
   *
   * @param {string} url the URL of the target.
   * @return {Get} create a new instance
   * @example
   * simple request
   * ```typescript
   * Get.from('https://my-fancy-url.com');
   * ```
   * with chained definitions
   * ```typescript
   * Get.from('https://my-fancy-url.com')
   *     // add headers
   *     .withHeaders({
   *         key: value,
   *     })
   *     // define expected response format
   *     .withResponseFormat('text');
   * ```
   * @category Factory
   */
  public static from(url: string): Get {
    return new Get(url);
  }

  /**
   * Add headers to the HTTP GET request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Get} the instance
   */
  public withHeaders(headers: Headers): Get {
    this.headers = headers;
    return this;
  }

  /**
   * Set the format the response body should be returned as.
   *
   * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
   * @return {Get} the instance
   */
  public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Get {
    this.responseBodyFormat = responseBodyFormat;
    return this;
  }
}
