import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * Send a HTTP PATCH Request.
 *
 * @group Actions
 */
export class Patch extends ARequest {
  private data?: any;

  private responseBodyFormat: ResponseBodyFormat = "json";

  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP PATCH request to the specified url.
   *
   * @param {Actor} actor the actor executes the request
   * @return {Response} the response
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.PATCH,
      this.url,
      this.headers,
      this.responseBodyFormat,
      this.data,
    );
  }

  /**
   * Send a HTTP PATCH request to the specified url.
   * Optionally it is possible to chain definitions for header sand data as well as the expected response type.
   *
   * @param {string} url the URL of the target.
   * @return {Patch} the new instance
   * @example
   * simple request
   * ```typescript
   * Patch.to('https://my-fancy-url.com');
   * ```
   * with chained definitions
   * ```typescript
   * Patch.to('https://my-fancy-url.com')
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
  public static to(url: string): Patch {
    const instance = new Patch(url);
    instance.setCallStackInitializeCalledWith({ url });
    return instance;
  }

  /**
   * Add data to the HTTP PATCH request to send.
   * PATCH requests bodies hold partial updates of the entities to be updated.
   *
   * @param {any} data the data.
   * @return {Patch} this instance
   */
  public withData(data: any): Patch {
    this.data = data;
    this.addToCallStack({ caller: "withData", calledWith: { data } });
    return this;
  }

  /**
   * Add headers to the HTTP PATCH request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Patch} this instance
   */
  public withHeaders(headers: Headers): Patch {
    this.headers = headers;
    this.addToCallStack({ caller: "withHeaders", calledWith: { headers } });
    return this;
  }

  /**
   * Set the format the response body should be returned as.
   *
   * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
   * @return {Patch} this instance
   */
  public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Patch {
    this.responseBodyFormat = responseBodyFormat;
    this.addToCallStack({
      caller: "withResponseBodyFormat",
      calledWith: { responseBodyFormat },
    });
    return this;
  }
}
