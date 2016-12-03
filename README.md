# remark-review

[![standard-readme compliant][standard-readme-badge]][standard-readme]
[![LICENSE][license-badge]][license]

[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURSBTICJcIiNgIiZoJTuhNyt3Kf///%2BCqxSgAAAAGdFJOUwpclbn%2B4Fj6/H8AAAABYktHRAZhZrh9AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AkEEjEV7MDQQwAAAGBJREFUCNc1TUEKgDAMi07vE/Q%2BRD8g%2B4BbvAvi/79iMjDQJm1CC6BbDzRsZI3incIpYeYFhCaYnLiyPYnYkwWZFWoFHrSuttCmmbwXh0eJQYVON4JthZTxCzzAmyb8%2BAAKXBRyN6RyZQAAAABJRU5ErkJggg==
[standard-readme-badge]: https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square

> [wooorm/remark] plugin for [kmuto/review]

[wooorm/remark]: https://github.com/wooorm/remark
[kmuto/review]: https://github.com/kmuto/review

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm i remark github:3846masa/remark-review#latest
```

## Usage

```js
const remark = require('remark');
const review = require('@3846masa/remark-review');

const markdown = `
# Introduction

This paper proposes ...
`;

remark().use(review).process(markdown, (err, vfile) => {
  if (err) {
    console.error(err);
  }
  console.log(vfile);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
