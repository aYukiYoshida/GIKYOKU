import { Actor, Question } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";

type Mode = "visible" | "enabled" | "editable" | "haveText" | "haveValue";

/**
 * @group Questions
 *
 * Get a specified state for selector.
 * A mode operator must be prepended.
 */
export class Element extends Question<boolean> {
  private positive = true;
  private mode: Mode = "visible";
  private payload: string | RegExp | (string | RegExp)[] = "";

  /**
   * @param {Selector} selector the selector of the element to check.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   *
   */
  private constructor(
    private selector: Selector,
    private options?: SelectorOptions,
  ) {
    super();
  }

  /**
   * Verify if an element has the specified state.
   *
   * @param {Actor} actor the actor
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   * @example
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "visible") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkVisibilityState(
          this.selector,
          this.positive ? "visible" : "hidden",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "enabled") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEnabledState(
          this.selector,
          this.positive ? "enabled" : "disabled",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "editable") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEditableState(
          this.selector,
          this.positive ? "editable" : "notEditable",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "haveText") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkSelectorText(
          this.selector,
          this.payload,
          this.positive ? "has" : "hasNot",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "haveValue") {
      // Element.values was called -> need to check multiple values
      if (!Array.isArray(this.payload)) {
        // Element.value was called -> need to check single values
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorValue(
            this.selector,
            this.payload,
            this.positive ? "has" : "hasNot",
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error(
        "Element.value: incompatible payload! Arrays can not be checked.",
      );
    }
    throw new Error("Unknown mode: Element.answeredBy");
  }

  /**
   * make the verifying for the negative.
   * @return {Element} this Element instance
   * @example <caption>Verify with Element class.</caption>
   * actor.asks(
   *  Element.of(page.getByRole("heading")).not.visible()
   * );
   */
  public get not() {
    this.positive = false;
    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element is visible.
   *
   * @return {Element} this Element instance
   *
   * @example <caption>simple call with just selector or with options.</caption>
   * Element.toBe.visible('mySelector');
   * Element.notToBe.visible(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public visible(): Element {
    this.mode = "visible";

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element is enabled.
   *
   * @return {Element} this Element instance
   * @example <caption>simple call with just selector or with options </caption>
   * Element.of("mySelector").not.enabled();
   * Element.of(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * ).enabled();
   */
  public enabled(): Element {
    this.mode = "enabled";

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element is editable.
   *
   * @return {Element} this Element instance
   * @example <caption>simple call with just selector or with options</caption>
   * Element.of('mySelector').editable();
   * Element.of(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * ).not.editable();
   */
  public editable(): Element {
    this.mode = "editable";
    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has the given text.
   * @param text the text to check.
   */
  public haveText(text: string | RegExp | (string | RegExp)[]): Element {
    this.mode = "haveText";
    this.payload = text;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has the given value.
   *
   * @param value the value to check.
   */
  public haveValue(value: string | RegExp): Element {
    this.mode = "haveValue";
    this.payload = value;

    return this;
  }

  /**
   * Prompt a question to verify the element.
   *
   * @param {Selector} locator the selector of the element to check.
   * @return {Element} Element instance
   */
  public static of(selector: Selector, options?: SelectorOptions) {
    return new Element(selector, options);
  }
}
