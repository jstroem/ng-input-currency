# ng-input-currency

[![Build Status](https://travis-ci.org/jstroem/ng-input-currency.svg?branch=master)](https://travis-ci.org/jstroem/ng-input-currency)
[![Coverage Status](https://coveralls.io/repos/github/jstroem/ng-input-currency/badge.svg?branch=master)](https://coveralls.io/github/jstroem/ng-input-currency?branch=master)
![][bower]
[![npm]](https://www.npmjs.com/package/ng-input-currency)

[build]: https://img.shields.io/travis/project/jstroem/ng-input-currency.svg?branch=master&style=flat-square
[coverage]: http://img.shields.io/coveralls/jstroem/ng-input-currency.svg?branch=master&style=flat-square
[bower]: https://img.shields.io/bower/v/ng-input-currency.svg?style=flat-square
[npm]: https://img.shields.io/npm/v/ng-input-currency.svg?style=flat-square

Angular directive for formatting inputs as currency fields. This repo is inspired by [format-as-currency](https://github.com/bcherny/format-as-currency).

## Demo

http://jstroem.github.io/ng-input-currency/demo

## Installation

Install via bower or NPM:

- Bower: `bower install --save ng-input-currency`
- NPM: `npm install --save ng-input-currency`

## Usage

```html
<div ng-controller="myController">
  <input ng-input-currency ng-model="value" type="text">
</div>

<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/format-as-currency/format-as-currency.js"></script>
<script>
  angular
  .module('myModule', ['ngInputCurrency'])
  .controller('myController', function ($scope) {
    $scope.value = '' // currency input value
  });
</script>
```

### With a module loader

#### Browserify

```js
var formatAsCurrency = require('ng-input-currency')
angular.module('myModule', [ngInputCurrency])
```

#### Rollup

```js
import * as ngInputCurrency from 'ng-input-currency'
angular.module('myModule', [ngInputCurrency])
```

#### Webpack

```js
var ngInputCurrency = require('ng-input-currency')
angular.module('myModule', [ngInputCurrency])
```

## Running the tests

```sh
npm test
```

## Contributing

Contributions are welcome!
