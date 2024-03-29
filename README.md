# GIKYOKU

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![BUILD](https://github.com/aYukiYoshida/GIKYOKU/actions/workflows/build.yaml/badge.svg?branch=main)](https://github.com/aYukiYoshida/GIKYOKU/actions/workflows/build.yaml)
[![npm version](https://badge.fury.io/js/gikyoku.svg)](https://badge.fury.io/js/gikyoku)

## Introduction

This repository is forked from [testla-screenplay-playwright-js](https://github.com/testla-project/testla-screenplay-playwright-js) to extend it.
This package uses the [Testla screenplay core package](https://www.npmjs.com/package/@testla/screenplay) to implement the screenplay pattern for Playwright.
By the way, GIKYOKU means "screenplay" in Japanese.

```js
'screenplay'
.toJapanese() // 戯曲
.toAlphabet() // GIKYOKU
```

## How to use this package?

This package comes with abilities, question and actions to browse user interfaces and querying APIs.

### Group Actions into a Task

Tasks group actions into logical entities. Here is a task that uses the actions Navigate, Fill and Click from the web capabilities and Get from api capabilities.

```js
// file: ./task/Login.ts

import { Actor, Task } from 'gikyoku';
import { Click, Fill, Navigate } from 'gikyoku/web';
import { Get} from 'gikyoku/api';

export class Login extends Task {
    public async performAs(actor: Actor): Promise<void> {
        return actor.attemptsTo(
            Navigate.to('https://www.my-fancy-url.com'),
            Fill.with(page.locator('#username'), actor.states('username') || ''),
            Fill.with(page.locator('#password'), actor.states('password') || ''),
            Click.on(page.locator()'#login-button')),
            Get.from('https://www.my-fancy-url.com')
        );
    }

    public static toApp(): Login {
        return new Login();
    }
}
```

### Initialize Actor with Abilities as Playwright Fixture

Initialize an actor with abilities as [Playwright Fixture](https://playwright.dev/docs/test-fixtures) for later use in a test case.

```js
import { Actor } from "gikyoku";
import { test as base } from "@playwright/test";

type MyActors = {
  actor: Actor;
};

const test = base.extend<MyActors>({
  actor: async ({ page, request }, use) => {
    const actor = Actor.named("TestActor")
      .with('username', 'John Doe')
      .with('password', 'MySecretPassword');
      .can(BrowseTheWeb.using(page))
      .can(UseAPI.using(request))
      .with("page", page);
    await use(actor);
  },
});
```

### Test case example

The final step is to define a test case using the Task defined above.

```js
import { Element } from 'gikyoku/web';
import { Login } from './task/Login';

// Example test case with Playwright
test.describe('My Test', () => {
  test('My first test', async ({ actor }) => {
    // Execute the task Login - as defined further above
    await actor.attemptsTo(Login.toApp());

    // Check if the login was successful - use the status question from the web package
    await actor.asks(
      Element.of(
        page.locator('#logged-in-indicator')
      ).visible()
    );
  });
});
```

Besides the existing actions, abilities and questions it is of course possible to define your own ones. How this is done, please refer to [core package](https://www.npmjs.com/package/@testla/screenplay).

Since tasks, actions and questions return promises, we advise to make use of the [require-await](https://eslint.org/docs/rules/require-await) rule in case of using eslint. This will help to prevent unexpected behavior when forgetting to await tasks/actions or questions.

### Logging

> This feature is currently in experimental stage and might see bigger changes.

Testla comes with logging which helps you to debug your test code. When logging is enabled all activities an actor triggers are logged in a comprehensive way to stdout. To enable logging set the DEBUG environment variable as follows:

```typescript
DEBUG=testla:sp
```

To understand how to enable logging in custom Actions and Questions please refer to the [logging guide](https://github.com/testla-project/testla-screenplay-core-js/blob/main/doc/logging.md) of Testla Screenplay Core.

### API Specification

See [API Specification](https://ayukiyoshida.github.io/GIKYOKU/index.html).
