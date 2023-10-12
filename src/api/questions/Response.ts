import { Actor, Question } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { Headers, Response as ResponseType, ResponseBodyType } from "../types";

/**
 * @group Questions
 *
 * Verify certain aspects of an API Response.
 * A mode operator must be prepended.
 */
export class Response extends Question<boolean> {
  // the response to check.
  private response: ResponseType = {
    body: null,
    status: 0,
    headers: {},
    duration: 0,
  };

  // the expected values to check + which values to check.
  private action!: {
    mode: "status" | "body" | "header" | "duration";
    payload?: any;
  };

  private constructor(private checkMode: "has" | "hasNot") {
    super();
  }

  /**
   * Verify if the given status is equal to the given response's status.
   *
   * @param {Actor} actor the actor which is used
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.action.mode === "status") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await UseAPI.as(actor).checkStatus(
          this.response,
          this.action.payload.statusCode,
          this.checkMode === "has" ? "equal" : "unequal",
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.action.mode === "body") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await UseAPI.as(actor).checkBody(
          this.response,
          this.action.payload.body,
          this.checkMode === "has" ? "equal" : "unequal",
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.action.mode === "header") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await UseAPI.as(actor).checkHeaders(
          this.response,
          this.action.payload.headers,
          this.checkMode === "has" ? "included" : "excluded",
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.action.mode === "duration") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await UseAPI.as(actor).checkDuration(
          this.response,
          this.action.payload.duration,
          this.checkMode === "has" ? "lessOrEqual" : "greater",
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    throw new Error("Unknown mode for Response.answeredBy");
  }

  /**
   * make the Question check for the positive.
   * i.e. checks if a condition is true.
   * @return {Response} the new Response instance
   */
  static get has(): Response {
    return new Response("has");
  }

  /**
   * make the Question check for the negative.
   * i.e. checks if a condition is false.
   * @return {Response} the new Response instance
   */
  static get hasNot(): Response {
    return new Response("hasNot");
  }

  /**
   * @category mode operators
   *
   * Verify if the response has a given status code.
   *
   * @param {ResponseType} response the response to check.
   * @param {number} statusCode the expected status code.
   * @return {Response} the Response instance
   * @example
   * Response.has.statusCode(response, 200);
   * Response.hasNot.statusCode(response, 200);
   */
  public statusCode(response: ResponseType, statusCode: number): Response {
    this.response = response;
    this.action = { mode: "status", payload: { statusCode } };

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if the response body equals given one.
   *
   * @param {ResponseType} response the response to check.
   * @param {ResponseBodyType} body the expected body.
   * @return {Response} the Response instance
   * @example
   * // json format
   * Response.has.body(response, { key: value });
   * // text format
   * Response.hasNot.body(response, 'text' );
   * // buffer format
   * Response.has.body(response, Buffer.from('abc') );
   */
  public body(response: ResponseType, body: ResponseBodyType): Response {
    this.response = response;
    this.action = { mode: "body", payload: { body } };

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if the response has the given headers either by key (value to be set to undefined) or key/value lookup.
   *
   * @param {ResponseType} response the response to check.
   * @param {Headers} headers the expected header.
   * @return {Response} the Response instance
   * @example
   * // only check for header presence by passing undefined as the value
   * Response.has.headers(response, { 'content-type': undefined });
   * // lookup for key/value combination to be present
   * Response.hasNot.headers(response, { 'content-type': 'application/json' });
   */
  public headers(response: ResponseType, headers: Headers): Response {
    this.response = response;
    this.action = { mode: "header", payload: { headers } };

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if the response (including receiving body) is received within a given duration.
   *
   * @param {ResponseType} response the response to check
   * @param {number} duration expected duration (in milliseconds) not to be exceeded
   * @return {Response} the Response instance
   * @example
   * // check if response was received within 2s
   * Response.has.beenReceivedWithin(response, 2000);
   * // check if response was not received within 2s
   * Response.hasNot.beenReceivedWithin(response, 2000);
   */
  public beenReceivedWithin(
    response: ResponseType,
    duration: number,
  ): Response {
    this.response = response;
    this.action = { mode: "duration", payload: { duration } };

    return this;
  }
}
