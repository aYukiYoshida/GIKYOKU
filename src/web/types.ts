import z from "zod";

export type Point = {
  x: number;
  y: number;
};

export type Modifiers = Array<"Alt" | "Control" | "Meta" | "Shift">;

export type CheckActionOptions = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
   * the element.
   */
  position?: Point;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
   * to `false`. Useful to wait until the element is ready for the action without performing it.
   */
  trial?: boolean;
};

export type ClickActionOptions = {
  /**
   * Defaults to `left`.
   */
  button?: "left" | "right" | "middle";

  /**
   * defaults to 1. See [UIEvent.detail].
   */
  clickCount?: number;

  /**
   * Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
   */
  delay?: number;

  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
   * current modifiers back. If not specified, currently pressed modifiers are used.
   */
  modifiers?: Modifiers;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
   * the element.
   */
  position?: Point;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
   * to `false`. Useful to wait until the element is ready for the action without performing it.
   */
  trial?: boolean;
};

export type DblclickActionOptions = {
  /**
   * Defaults to `left`.
   */
  button?: "left" | "right" | "middle";

  /**
   * Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
   */
  delay?: number;

  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
   * current modifiers back. If not specified, currently pressed modifiers are used.
   */
  modifiers?: Modifiers;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
   * the element.
   */
  position?: Point;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
   * to `false`. Useful to wait until the element is ready for the action without performing it.
   */
  trial?: boolean;
};

export type DragAndDropActionOptions = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not
   * specified, some visible point of the element is used.
   */
  sourcePosition?: Point;

  /**
   * Drops on the target element at this point relative to the top-left corner of the element's padding box. If not
   * specified, some visible point of the element is used.
   */
  targetPosition?: Point;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
   * to `false`. Useful to wait until the element is ready for the action without performing it.
   */
  trial?: boolean;
};

export type FillActionOptions = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type HoverActionOptions = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
   * current modifiers back. If not specified, currently pressed modifiers are used.
   */
  modifiers?: Modifiers;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
   * the element.
   */
  position?: Point;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
   * to `false`. Useful to wait until the element is ready for the action without performing it.
   */
  trial?: boolean;
};

export type NavigateActionOptions = {
  /**
   * Referer header value. If provided it will take preference over the referer header value set by
   * [page.setExtraHTTPHeaders(headers)](https://playwright.dev/docs/api/class-page#page-set-extra-http-headers).
   */
  referer?: string;

  /**
   * When to consider operation succeeded, defaults to `load`. Events can be either:
   * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
   * - `'load'` - consider operation to be finished when the `load` event is fired.
   * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
   *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
   * - `'commit'` - consider operation to be finished when network response is received and the document started
   *   loading.
   */
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};

export type ReloadActionOptions = {
  /**
   * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
   * `navigationTimeout` option in the config, or by using the
   * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
   * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When to consider operation succeeded, defaults to `load`. Events can be either:
   * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
   * - `'load'` - consider operation to be finished when the `load` event is fired.
   * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
   *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
   * - `'commit'` - consider operation to be finished when network response is received and the document started
   *   loading.
   */
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};

export type PressActionOptions = {
  /**
   * Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
   */
  delay?: number;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type SelectActionOptions = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type TypeActionOptions = {
  /**
   * Time to wait between key presses in milliseconds. Defaults to 0.
   */
  delay?: number;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type WaitForLoadStateActionOptions = {
  /**
   * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
   * `navigationTimeout` option in the config, or by using the
   * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
   * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type WaitForUrlActionOptions = {
  /**
   * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
   * `navigationTimeout` option in the config, or by using the
   * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
   * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /**
   * When to consider operation succeeded, defaults to `load`. Events can be either:
   * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
   * - `'load'` - consider operation to be finished when the `load` event is fired.
   * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
   *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
   * - `'commit'` - consider operation to be finished when network response is received and the document started
   *   loading.
   */
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};

export type WaitForLocatorActionOptions = {
  /**
   * Defaults to `'visible'`. Can be either:
   * - `'attached'` - wait for element to be present in DOM.
   * - `'detached'` - wait for element to not be present in DOM.
   * - `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element
   *   without any content or with `display:none` has an empty bounding box and is not considered visible.
   * - `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or
   *   `visibility:hidden`. This is opposite to the `'visible'` option.
   */
  state?: "attached" | "detached" | "visible" | "hidden";

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export type ScreenQuestionMode = "haveUrl" | "haveTitle" | "haveScreenshot";

export type ElementQuestionMode =
  | "visible"
  | "enabled"
  | "editable"
  | "checked"
  | "focused"
  | "haveText"
  | "haveValue"
  | "haveCount"
  | "haveCSS"
  | "haveScreenshot"
  | "containText";

// for Element.haveText and Element.containText
const textPayloadSchema = z.union([
  z.string(),
  z.instanceof(RegExp),
  z.array(z.union([z.string(), z.instanceof(RegExp)])),
]);

export type TextPayload = z.infer<typeof textPayloadSchema>;
export const isTextPayload = (value: unknown): value is TextPayload => {
  return textPayloadSchema.safeParse(value).success;
};

// for Element.haveValue
const valuePayloadSchema = z.union([z.string(), z.instanceof(RegExp)]);

export type ValuePayload = z.infer<typeof valuePayloadSchema>;
export const isValuePayload = (value: unknown): value is ValuePayload => {
  return valuePayloadSchema.safeParse(value).success;
};

// for Element.haveCount
const countPayloadSchema = z.number();
export type CountPayload = z.infer<typeof countPayloadSchema>;
export const isCountPayload = (value: unknown): value is CountPayload => {
  return countPayloadSchema.safeParse(value).success;
};

// for Element.haveCSS
const stylePayloadSchema = z.object({
  name: z.string(),
  value: z.union([z.string(), z.instanceof(RegExp)]),
});

export type StylePayload = z.infer<typeof stylePayloadSchema>;
export const isStylePayload = (value: unknown): value is StylePayload => {
  return stylePayloadSchema.safeParse(value).success;
};

// for Element.haveScreenshot and Screen.haveScreenshot
const screenshotPayloadSchema = z.union([z.string(), z.array(z.string())]);

export type ScreenshotPayload = z.infer<typeof screenshotPayloadSchema>;
export const isScreenshotPayload = (
  value: unknown,
): value is ScreenshotPayload => {
  return screenshotPayloadSchema.safeParse(value).success;
};

// for Screen.haveUrl
export type UrlPayload = z.infer<typeof valuePayloadSchema>;
export const isUrlPayload = (value: unknown): value is UrlPayload => {
  return valuePayloadSchema.safeParse(value).success;
};

// for Screen.haveTitle
export type TitlePayload = z.infer<typeof valuePayloadSchema>;
export const isTitlePayload = (value: unknown): value is TitlePayload => {
  return valuePayloadSchema.safeParse(value).success;
};
