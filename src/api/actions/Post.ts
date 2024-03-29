import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * Send a HTTP POST Request.
 *
 * @group Actions
 */
export class Post extends ARequest {
  private data?: any;

  private responseBodyFormat: ResponseBodyFormat = "json";

  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP POST request to the specified url.
   *
   * @param {Actor} actor the used actor
   * @return {Response} the returned response
   * @category called internally
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.POST,
      this.url,
      this.headers,
      this.responseBodyFormat,
      this.data,
    );
  }

  /**
   * Send a HTTP POST request to the specified url.
   * Optionally it is possible to chain definitions for header sand data as well as the expected response type.
   *
   * @param {string} url the URL of the target.
   * @return {Post} a new Post instance
   * @example
   * simple request
   * ```typescript
   * Post.to('https://my-fancy-url.com');
   * ```
   * with chained definitions
   * ```typescript
   * Post.to('https://my-fancy-url.com')
   *     // add headers
   *     .withHeaders({
   *         key: value,
   *     })
   *    // add data
   *     .withData({
   *         key: value,
   *     })
   *     // define expected response format
   *     .withResponseFormat('text');
   * ```
   * @category Factory
   */
  public static to(url: string): Post {
    const instance = new Post(url);
    instance.setCallStackInitializeCalledWith({ url });
    return instance;
  }

  /**
   * Add data to the HTTP POST request to send.
   *
   * @param {any} data the data.
   * @return {Post} the Post instance
   */
  public withData(data: any): Post {
    this.data = data;
    this.addToCallStack({ caller: "withData", calledWith: { data } });
    return this;
  }

  /**
   * Add headers to the HTTP POST request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Post} the Post instance
   */
  public withHeaders(headers: Headers): Post {
    this.headers = headers;
    this.addToCallStack({ caller: "withHeaders", calledWith: { headers } });
    return this;
  }

  /**
   * Set the format the response body should be returned as.
   *
   * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
   * @return {Post} the Post instance
   */
  public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Post {
    this.responseBodyFormat = responseBodyFormat;
    this.addToCallStack({
      caller: "withResponseBodyFormat",
      calledWith: { responseBodyFormat },
    });
    return this;
  }
}
