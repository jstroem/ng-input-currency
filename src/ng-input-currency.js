module.exports = angular.module('ngInputCurrency', []).name;

angular.module('ngInputCurrency').service('ngInputCurrencyService', ['$locale', function($locale) {
  this.toFloat = function(str) {
    if (angular.isNumber(str))
      return parseFloat(str, 10);

    if (!angular.isString(str))
      throw new TypeError('ngInputCurrencyService.toFloat expects argument to be a String, but was given ' + str);

    str = str
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'), '')
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.CURRENCY_SYM), 'g'), '')
      .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g'), '.');

    return parseFloat(str, 10);
  };

  this.stringToRegExp = function(str, opt) {
    return str.replace(/\./g,'\\.')
         .replace(/\[/g, '\\[')
         .replace(/\]/g, '\\]')
         .replace(/\,/g, '\\,')
         .replace(/\|/g, '\\|')
         .replace(/\)/g, '\\)')
         .replace(/\(/g, '\\(')
         .replace(/\^/g, '\\^')
         .replace(/\$/g, '\\$')
         .replace(/\_/g, '\\_')
         .replace(/\?/g, '\\?')
         .replace(/\-/g, '\\-');
  };

  this.isValid = function(val) {
    return angular.isNumber(val) && !isNaN(val);
  };

  this.preformatValue = function(val) {
    if (!angular.isString(val))
      return val;

    var groupRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'),
        decimalRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g');

    var groupMatch = val.match(groupRegex), decimalMatch = val.match(decimalRegex);
    if (groupMatch && groupMatch.length == 1 && (!decimalMatch || decimalMatch.length === 0))
      return val.replace(groupRegex, '.');

    if (decimalMatch && decimalMatch.length == 1 && (!groupMatch || groupMatch.length === 0))
      return val.replace(decimalRegex, '.');

    return val;
  };
}]);

angular.module('ngInputCurrency').directive('ngInputCurrency', ['$locale','$filter','ngInputCurrencyService','$timeout', function($locale, $filter, util, $timeout) {
  var link = function($scope, $element, $attrs, $ngModel){

    var opts = {
      updateOn: 'blur enter',
      updateOnDefault: false
    };
    if ($ngModel.$options !== null && $ngModel.$options !== undefined)
      opts = $ngModel.$options.createChild(opts);

    $ngModel.$options = opts;

    var filter = $filter('currency');
    $ngModel.$formatters.push(function fromModelToView(value) {
      return filter(value);
    });

    $ngModel.$parsers.push(function(value) {
      value = util.preformatValue(value);

      var currency = util.toFloat(filter(value));
      if (util.isValid(currency)) {
        $ngModel.$setViewValue(filter(currency));
        $ngModel.$render();
        return currency;
      }
    });

    $element.on('blur', function(){
      if ($ngModel.$viewValue === $ngModel.$modelValue)
        $element.val(filter($ngModel.$modelValue));
    });

    $element.on('focus', function(){
      if (util.isValid($ngModel.$modelValue)) {
        $ngModel.$setViewValue($ngModel.$modelValue);
        $ngModel.$render();
      }
    });

    $ngModel.$validators.currency = function(modelValue) {
      return util.isValid(modelValue);
    };

  };
  return {
    'restrict': 'A',
    'require': 'ngModel',
    'link': link
  };
}]);
