import { Actor, Question } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";
import {
  ElementQuestionMode,
  TextPayload,
  isTextPayload,
  ValuePayload,
  isValuePayload,
  CountPayload,
  isCountPayload,
  StylePayload,
  isStylePayload,
  ScreenshotPayload,
  isScreenshotPayload,
} from "../types";

/**
 * @group Questions
 *
 * Get a specified state for selector.
 * A mode operator must be prepended.
 */
export class Element extends Question<boolean> {
  private positive = true;
  private mode: ElementQuestionMode = "visible";
  private payload:
    | TextPayload
    | ValuePayload
    | CountPayload
    | StylePayload
    | ScreenshotPayload = "";

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
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "visible") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkVisibilityState(
          this.selector,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "enabled") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEnabledState(
          this.selector,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "editable") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEditableState(
          this.selector,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "checked") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkCheckedState(
          this.selector,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "focused") {
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkFocusedState(
          this.selector,
          this.positive,
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "haveText") {
      if (isTextPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorText(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveText: incompatible payload.");
    }
    if (this.mode === "containText") {
      if (isTextPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorContainText(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.containText: incompatible payload.");
    }
    if (this.mode === "haveValue") {
      if (isValuePayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorValue(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveValue: incompatible payload.");
    }
    if (this.mode === "haveCount") {
      if (isCountPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorCount(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveCount: incompatible payload.");
    }
    if (this.mode === "haveCSS") {
      if (isStylePayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorCSS(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveCSS: incompatible payload.");
    }
    if (this.mode === "haveScreenshot") {
      if (isScreenshotPayload(this.payload)) {
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorScreenshot(
            this.selector,
            this.payload,
            this.positive,
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error("Element.haveScreenshot: incompatible payload.");
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
   * Verify if an element is checked.
   *
   * @return {Element} this Element instance
   * @example <caption>simple call with just selector or with options</caption>
   * Element.of('mySelector').checked();
   * Element.of(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * ).not.checked();
   */
  public checked(): Element {
    this.mode = "checked";
    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element is focused.
   *
   * @return {Element} this Element instance
   * @example <caption>simple call with just selector or with options</caption>
   * Element.of('mySelector').focused();
   * Element.of(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * ).not.focused();
   */
  public focused(): Element {
    this.mode = "focused";
    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has the given text.
   * @param text the text to check.
   */
  public haveText(text: TextPayload): Element {
    this.mode = "haveText";
    this.payload = text;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element contains the given text.
   * @param text the text to check.
   */
  public containText(text: TextPayload): Element {
    this.mode = "containText";
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
  public haveValue(value: ValuePayload): Element {
    this.mode = "haveValue";
    this.payload = value;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has exact number of DOM node.
   *
   * @param count the value to check.
   */
  public haveCount(count: CountPayload): Element {
    this.mode = "haveCount";
    this.payload = count;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has the given style.
   *
   * @param name the style name.
   * @param value the style value.
   */
  public haveCSS(name: string, value: string | RegExp): Element {
    this.mode = "haveCSS";
    this.payload = { name, value };

    return this;
  }

  /**
   * @category mode operators
   *
   * Verify if an element has the given screenshot.
   *
   * @param name the style name.
   */
  public haveScreenshot(name: string): Element {
    this.mode = "haveScreenshot";
    this.payload = name;

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
