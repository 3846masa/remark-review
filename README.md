# remark-review

[![npm][npm-badge]][npm]
[![LICENSE][license-badge]][license]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/remark-review?icon=npm
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme
[npm-badge]: https://flat.badgen.net/npm/v/remark-review
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[standard-readme-badge]: https://flat.badgen.net/badge/standard-readme/OK/green

> [wooorm/remark] plugin for [kmuto/review]

[wooorm/remark]: https://github.com/wooorm/remark
[kmuto/review]: https://github.com/kmuto/review

## Table of Contents

<!-- TOC depthFrom:2 depthTo:3 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [Syntax](#syntax)
  - [Configure](#configure)
- [Contribute](#contribute)
- [License](#license)

<!-- /TOC -->

## Install

```
npm i remark-cli remark-review
```

## Usage

### CLI

See [here][remark-cli] for more details.

```bash
remark --use remark-review document.md --output
```

If you configure via `rc` file, you should type below.

```bash
remark document.md
```

[remark-cli]: https://github.com/wooorm/remark/tree/master/packages/remark-cli#cli

### Syntax

Inspired by [pandoc-crossref].

[pandoc-crossref]: https://github.com/lierdakil/pandoc-crossref

#### Image label

```md
![Caption](file.ext){#fig:label}
```

#### Equation label

```md
$$
x^2 + y^2 = r^2
$$

: Equation of a circle {#eq:label}
```

#### Table caption / label

```md
|  a  |  b  |  c  |
| :-: | :-: | :-: |
|  1  |  2  |  3  |

: Caption {#tbl:label}
```

#### Section label

```md
# Section {#sec:section}
```

#### Code block label

````md
```js
console.log('Hello World!');
```

: Caption {#lst:label}
````

#### References

##### From label (e.g. Figure)

```md
[@fig:label1] or [@fig:label1;@fig:label2;...]
```

##### BibTeX

```md
[@jones99] or [@jones99;@smith06;...]
```

### Configure

#### Fields

|    Field     | Description                                            |
| :----------: | :----------------------------------------------------- |
| baseTemplate | The document template                                  |
| documentInfo | The data passed to the base template                   |
| imageConfigs | `\includegraphics` configs                             |
| templatesDir | Template folder for AST (See [`templates`][templates]) |

[templates]: ./src/templates

##### Templates

You can use [ejs] template.
remark-review read `baseTemplate` and bind `documentInfo` to output.

[ejs]: https://github.com/mde/ejs

```review
#@# ReVIEW Template written by ejs format.
#@# Render results will be exported as `body`.

<%= body %>
```

#### `remarkrc`

You can configure via `rc` file (e.g. `remarkrc.json`, `remarkrc.yml`).
See also [here][remarkrc].

```yml
# Required
output: true
plugins:
  - remark-review

# Optional
# NOTE: You should put remark-review configs under `review`.
settings:
  review:
    baseTemplate: review/template.re
    imageConfigs:
      scale: 0.85
```

[remarkrc]: https://github.com/unifiedjs/unified-engine/blob/master/doc/configure.md

#### YAML Frontmatter

You can configure each files via YAML Frontmatter.
See also [here][yaml-frontmatter]

```md
---
baseTemplate: ./review/template.re
---

# Hello World

Lorem ipsum dolor sit amet...
```

[yaml-frontmatter]: https://github.com/wooorm/remark-frontmatter

## Contribute

PRs accepted.

## License

[MIT (c) 3846masa](https://3846masa.mit-license.org)
