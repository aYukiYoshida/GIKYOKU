import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * @group Actions
 *
 * Send a HTTP PUT Request.
 */
export class Put extends ARequest {
  private data?: any;

  private responseBodyFormat: ResponseBodyFormat = "json";

  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP PUT request to the specified url.
   *
   * @param {Actor} actor the actor object
   * @return {Response} the returned response
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.PUT,
      this.url,
      this.headers,
      this.responseBodyFormat,
      this.data,
    );
  }

  /**
   * Send a HTTP PUT request to the specified url.
   * Optionally it is possible to chain definitions for header sand data as well as the expected response type.
   *
   * @param {string} url the URL of the target.
   * @return {Put} new Put instance
   * @example
   * // simple request
   * Put.to('https://my-fancy-url.com');
   * // with chained definitions
   * Put.to('https://my-fancy-url.com')
   *     // add headers
   *     .withHeaders({
   *         key: value,
   *     })
   *     // add data
   *     .withData({
   *         key: value,
   *     })
   *     // define expected response format
   *     .withResponseFormat('text');
   */
  public static to(url: string): Put {
    return new Put(url);
  }

  /**
   * Add data to the HTTP PUT request to send.
   * PUT requests bodies hold the full entity information to be updated.
   *
   * @param {any} data the data.
   * @return {Put} the Put instance
   */
  public withData(data: any): Put {
    this.data = data;
    return this;
  }

  /**
   * Add headers to the HTTP PUT request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Put} the Put instance
   */
  public withHeaders(headers: Headers): Put {
    this.headers = headers;
    return this;
  }

  /**
   * Set the format the response body should be returned as.
   *
   * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
   * @return {Put} the Put instance
   */
  public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Put {
    this.responseBodyFormat = responseBodyFormat;
    return this;
  }
}
