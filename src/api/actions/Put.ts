import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * Send a HTTP PUT Request.
 *
 * @group Actions
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
   * @category called internally
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
   * simple request
   * ```typescript
   * Put.to('https://my-fancy-url.com');
   * ```
   * with chained definitions
   * ```typescript
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
   * ```
   * @category Factory
   */
  public static to(url: string): Put {
    const instance = new Put(url);
    instance.setCallStackInitializeCalledWith({ url });
    return instance;
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
    this.addToCallStack({ caller: "withData", calledWith: { data } });
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
    this.addToCallStack({ caller: "withHeaders", calledWith: { headers } });
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
    this.addToCallStack({
      caller: "withResponseBodyFormat",
      calledWith: { responseBodyFormat },
    });
    return this;
  }
}
