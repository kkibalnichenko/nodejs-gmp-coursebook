---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Guidelines / Style

### 1. Introduction
Add `Introduction` section to your module and describe briefly what this module will be about. Add links to every module page.

### 2. Headings
Start every page with `# 1. Heading`. Use sub-heading: `## 1.1 Sub-heading`, `### Sub-sub-heading`. Also use **bold** / __bold__ and *cursive* / _cursive_ to highlight something.

### 3. Mentions
If you mention some library, plugin, or term, make that name a link to an npm page, article, or another resource that will bring more clarity.

_Example_:
The [Grunt](https://gruntjs.com/) ecosystem is massive. You can use Grunt to automate just about anything with a minimum of effort.

### 4. Use anchor links in lengthy articles.
If you feel that some article is useful, but too big, and you think it could be helpful for a student to read it, then you can add a text with a link to there, so the student could go dig deeper on their own.

_Example_:
Find more writing tips [here](https://www.grammarly.com/blog/writing-tips/).

### 5. Image captures
If you add picture and feel that the description is needed, add a caption below, like `Figure 1 - The Testing Trophy`.

### 6. Make the content easy to skim.
Don’t intimidate readers with a wall of text. Use headers, callouts, bullet points, spacing, and visuals to highlight important information and keep the complete set of instructions visible at a glance.

### 7. Use note component to mention useful information.
Find more info [here](https://docusaurus.io/docs/markdown-features).
_Example_: 
:::note
In the case of dynamic typing, the type is bound to the value. The checks are made at runtime.
:::

### 8. Code snippets
If you want to add terminal command, use:

_Example_: 
```bash
npm install --save-dev webpack
```

Consider adding file name and extension:

_Example_:
```js title="sum.js"
const sum = (a, b) =>  return a + b;
```

You can also place files with code in different tabs:

_Example_:

Firstly, import Tabs on the top of the doc file:
```js
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Then add them like in the example below:
<Tabs
    defaultValue="test"
    values={[
        {label: 'Test', value: 'test'},
        {label: 'Code', value: 'code'},
    ]}>
<TabItem value="test">

```js title="sum.test.js"
describe('sum (helper)', () => {
  it('should summarize 2 numbers', () => {
    const actual = sum(1, 2);
    const expected = 3;

    expect(actual).toBe(expected);
  });

  it('should throw an error if input values are not numbers', () => {
    const actual = () => sum('eat', 'pie');
    const expectedErrorMessage = 'Input values should be numbers!';

    expect(actual).toThrowError(expectedErrorMessage);
  });
});
```

</TabItem>
<TabItem value="code">

```js title="sum.js"
const sum = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Input values should be numbers!');
  }

  return a + b;
};
```

</TabItem>
</Tabs>

If you want to highlight some line in the code, use `highlight-next-line` (find more info [here](https://docusaurus.io/docs/markdown-features/code-blocks#line-highlighting))
```js
describe('bag', () => {
// highlight-next-line
  it('should increment banana by 1', () => {
    addBanana();

    expect(bag.banana).toBe(1);
  });
});
```
