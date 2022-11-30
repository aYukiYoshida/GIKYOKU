import { Cookie, expect, Locator, Page } from '@playwright/test';
import { Response } from 'playwright';
import { Ability, Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { recursiveLocatorLookup } from '../utils';

/**
 * This class represents the actor's ability to use a Browser.
 */
export class BrowseTheWeb extends Ability {
    /**
     * Initialize this Ability by passing an already existing Playwright Page object.
     *
     * @param page the Playwright Page that will be used to browse.
     */
    public static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param {Actor} actor Actor is using this ability
     */
    public static as(actor: Actor): BrowseTheWeb {
        return actor.withAbilityTo(this) as BrowseTheWeb;
    }

    /**
     * Initialize this Ability by passing an already existing Playwright Page object.
     *
     * @param {Page} page the Playwright Page that will be used to browse.
     */
    private constructor(private page: Page) {
        super();
    }

    /**
     * Get the page object
     *
     * @returns {Page} the page object
     */
    public getPage(): Page {
        return this.page;
    }

    /**
     * Use the page to navigate to the specified URL.
     *
     * @param {string} url the url to access.
     * @return {Response}
     */
    public async goto(url: string): Promise<Response | null> {
        return this.page.goto(url);
    }

    /**
     * Wait for the specified loading state.
     *
     * @param {string} status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
     * @return {void} Returns when the required load state has been reached.
     */
    public async waitForLoadState(status: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
        return this.page.waitForLoadState(status);
    }

    /**
     * Use the page mouse to hover over the specified element.
     *
     * @param {Selector} selector the selector of the element to hover over.
     * @param {SelectorOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
     * @return {void}
     */
    public async hover(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Promise<void> {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .hover({ modifiers: options?.modifiers });
    }

    /**
     * Press the specified key(s) on the keyboard.
     *
     * @param {string} input the key(s). multiple keys can be pressed by concatenating with "+"
     * @return {void}
     */
    public async press(input: string): Promise<void> {
        return this.page.keyboard.press(input);
    }

    /**
     * Check the specified checkbox.
     *
     * @param {Selector} selector the selector of the checkbox.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {void}
     */
    public async checkBox(selector: Selector, options?: SelectorOptions): Promise<void> {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .check();
    }

    /**
     * Wait until the element of the specified selector exists.
     *
     * @param {Selector} selector the selector of the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Locator} Promise<Locator> returns the locator
     */
    public async waitForSelector(selector: Selector, options?: SelectorOptions): Promise<Locator> {
        return recursiveLocatorLookup({ page: this.page, selector, options });
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @param {Selector} sourceSelector the selector of the source element.
     * @param {Selector} targetSelector the selector of the target element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {void}
     */
    public async dragAndDrop(sourceSelector: Selector, targetSelector: Selector, options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }): Promise<void> {
        const target = await recursiveLocatorLookup({ page: this.page, selector: targetSelector, options: options?.target });
        return (await recursiveLocatorLookup({ page: this.page, selector: sourceSelector, options: options?.source }))
            .dragTo(target, { targetPosition: { x: 0, y: 0 } });
    }

    /**
     * Fill the element specified by the selector with the given input.
     *
     * @param {Selector} selector the selector of the source element.
     * @param {string} input the input to fill the element with.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {void}
     */
    public async fill(selector: Selector, input: string, options?: SelectorOptions): Promise<void> {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .fill(input);
    }

    /**
     * Type the given input into the element specified by the selector.
     *
     * @param {Selector} selector the selector of the source element.
     * @param {string} input the input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {void}
     */
    public async type(selector: Selector, input: string, options?: SelectorOptions): Promise<void> {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .type(input);
    }

    /**
     * Click the element specified by the selector.
     *
     * @param {Selector} selector the selector of the element to click.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     */
    public async click(selector: Selector, options?: SelectorOptions) {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .click();
    }

    /**
     * Double click the element specified by the selector.
     *
     * @param {Selector} selector the selector of the element to double click.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     */
    public async dblclick(selector: Selector, options?: SelectorOptions) {
        return (await recursiveLocatorLookup({ page: this.page, selector, options }))
            .dblclick();
    }

    /**
     * Validate if a locator on the page is visible or hidden.
     *
     * @param {string} mode the expected property of the selector that needs to be checked. either 'visible' or 'hidden'.
     * @param {Selector} selector the locator to search for.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @returns {boolean} Promise<boolean> true if the element is visible/hidden as expected, false if the timeout was reached.
     */
    public async checkVisibilityState(selector: Selector, mode: 'visible' | 'hidden', options?: SelectorOptions): Promise<boolean> {
        if (mode === 'visible') {
            await expect(await recursiveLocatorLookup({ page: this.page, selector, options: { ...options, state: 'visible' } })).toBeVisible({ timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({ page: this.page, selector, options: { ...options, state: 'hidden' } })).toBeHidden({ timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Validate if a locator on the page is enabled or disabled.
     *
     * @param selector the locator to search for.
     * @param mode the expected property of the selector that needs to be checked. either 'enabled' or 'disabled'.
     * @param options (optional) advanced selector lookup options.
     * @returns true if the element is enabled/disabled as expected, false if the timeout was reached.
     */
    public async checkEnabledState(selector: Selector, mode: 'enabled' | 'disabled', options?: SelectorOptions): Promise<boolean> {
        if (mode === 'enabled') {
            await expect(await recursiveLocatorLookup({ page: this.page, selector, options: { ...options, state: 'visible' } })).toBeEnabled({ timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({ page: this.page, selector, options: { ...options, state: 'visible' } })).toBeDisabled({ timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.
     */
    public async getCookies(urls?: string | string[] | undefined): Promise<Cookie[]> {
        return this.page.context().cookies(urls);
    }

    /**
     * Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).
     */
    public async addCookies(cookies: Cookie[]): Promise<void> {
        return this.page.context().addCookies(cookies);
    }

    /**
     * Clear the browser context cookies.
     */
    public async clearCookies(): Promise<void> {
        return this.page.context().clearCookies();
    }

    /**
     * Get a local storage item.
     *
     * @param key the key that specifies the item.
     */
    public async getLocalStorageItem(key: string): Promise<any> {
        return this.page.evaluate((key) => {
            const value = localStorage.getItem(key);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, key);
    }

    /**
     * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param key the key that specifies the item.
     * @param value the value to set.
     */
    public async setLocalStorageItem(key: string, value: any): Promise<void> {
        return this.page.evaluate(({ key, value }) => {
            localStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        }, { key, value });
    }

    /**
     * Delete a local storage item, if a key/value pair with the given key exists.
     *
     * @param key the key that specifies the item.
     */
    public async removeLocalStorageItem(key: string): Promise<void> {
        return this.page.evaluate((key) => {
            localStorage.removeItem(key);
            return Promise.resolve();
        }, key);
    }

    /**
     * Get a session storage item.
     *
     * @param {string} key the key that specifies the item.
     * @return {any}
     */
    public async getSessionStorageItem(key: string): Promise<any> {
        return this.page.evaluate((key) => {
            const value = sessionStorage.getItem(key);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, key);
    }

    /**
     * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param {string} key the key that specifies the item.
     * @param {any} value the value to set.
     * @return {void}
     */
    public async setSessionStorageItem(key: string, value: any): Promise<void> {
        return this.page.evaluate(({ key, value }) => {
            sessionStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        }, { key, value });
    }

    /**
     * Delete a session storage item, if a key/value pair with the given key exists.
     *
     * @param {string} key the key that specifies the item.
     * @return {void}
     */
    public async removeSessionStorageItem(key: string): Promise<void> {
        return this.page.evaluate((key) => {
            sessionStorage.removeItem(key);
            return Promise.resolve();
        }, key);
    }

    /**
     * Set the value of a Selector of type select to the given option.
     *
     * @param {Selector} selector the string representing the (select) selector.
     * @param {string} option the label of the option.
     * @param {SelectorOptions} selectorOptions (optional): advanced selector lookup options.
     * @return {any}
     */
    public async selectOption(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions): Promise<any> {
        return (await recursiveLocatorLookup({ page: this.page, selector, options: selectorOptions })).selectOption(option);
    }
}
