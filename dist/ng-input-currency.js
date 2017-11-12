(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    val = val.replace($locale.NUMBER_FORMATS.CURRENCY_SYM, '')

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbmctaW5wdXQtY3VycmVuY3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCduZ0lucHV0Q3VycmVuY3knLCBbXSkubmFtZTtcblxuYW5ndWxhci5tb2R1bGUoJ25nSW5wdXRDdXJyZW5jeScpLnNlcnZpY2UoJ25nSW5wdXRDdXJyZW5jeVNlcnZpY2UnLCBbJyRsb2NhbGUnLCBmdW5jdGlvbigkbG9jYWxlKSB7XG4gIHRoaXMudG9GbG9hdCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmIChhbmd1bGFyLmlzTnVtYmVyKHN0cikpXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIsIDEwKTtcblxuICAgIGlmICghYW5ndWxhci5pc1N0cmluZyhzdHIpKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmdJbnB1dEN1cnJlbmN5U2VydmljZS50b0Zsb2F0IGV4cGVjdHMgYXJndW1lbnQgdG8gYmUgYSBTdHJpbmcsIGJ1dCB3YXMgZ2l2ZW4gJyArIHN0cik7XG5cbiAgICBzdHIgPSBzdHJcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5zdHJpbmdUb1JlZ0V4cCgkbG9jYWxlLk5VTUJFUl9GT1JNQVRTLkdST1VQX1NFUCksICdnJyksICcnKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnN0cmluZ1RvUmVnRXhwKCRsb2NhbGUuTlVNQkVSX0ZPUk1BVFMuQ1VSUkVOQ1lfU1lNKSwgJ2cnKSwgJycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuc3RyaW5nVG9SZWdFeHAoJGxvY2FsZS5OVU1CRVJfRk9STUFUUy5ERUNJTUFMX1NFUCksICdnJyksICcuJyk7XG5cbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIsIDEwKTtcbiAgfTtcblxuICB0aGlzLnN0cmluZ1RvUmVnRXhwID0gZnVuY3Rpb24oc3RyLCBvcHQpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcLi9nLCdcXFxcLicpXG4gICAgICAgICAucmVwbGFjZSgvXFxbL2csICdcXFxcWycpXG4gICAgICAgICAucmVwbGFjZSgvXFxdL2csICdcXFxcXScpXG4gICAgICAgICAucmVwbGFjZSgvXFwsL2csICdcXFxcLCcpXG4gICAgICAgICAucmVwbGFjZSgvXFx8L2csICdcXFxcfCcpXG4gICAgICAgICAucmVwbGFjZSgvXFwpL2csICdcXFxcKScpXG4gICAgICAgICAucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpXG4gICAgICAgICAucmVwbGFjZSgvXFxeL2csICdcXFxcXicpXG4gICAgICAgICAucmVwbGFjZSgvXFwkL2csICdcXFxcJCcpXG4gICAgICAgICAucmVwbGFjZSgvXFxfL2csICdcXFxcXycpXG4gICAgICAgICAucmVwbGFjZSgvXFw/L2csICdcXFxcPycpXG4gICAgICAgICAucmVwbGFjZSgvXFwtL2csICdcXFxcLScpO1xuICB9O1xuXG4gIHRoaXMuaXNWYWxpZCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiBhbmd1bGFyLmlzTnVtYmVyKHZhbCkgJiYgIWlzTmFOKHZhbCk7XG4gIH07XG5cbiAgdGhpcy5wcmVmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIGlmICghYW5ndWxhci5pc1N0cmluZyh2YWwpKVxuICAgICAgcmV0dXJuIHZhbDtcblxuICAgIHZhbCA9IHZhbC5yZXBsYWNlKCRsb2NhbGUuTlVNQkVSX0ZPUk1BVFMuQ1VSUkVOQ1lfU1lNLCAnJylcblxuICAgIHZhciBncm91cFJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0cmluZ1RvUmVnRXhwKCRsb2NhbGUuTlVNQkVSX0ZPUk1BVFMuR1JPVVBfU0VQKSwgJ2cnKSxcbiAgICAgICAgZGVjaW1hbFJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0cmluZ1RvUmVnRXhwKCRsb2NhbGUuTlVNQkVSX0ZPUk1BVFMuREVDSU1BTF9TRVApLCAnZycpO1xuXG4gICAgdmFyIGdyb3VwTWF0Y2ggPSB2YWwubWF0Y2goZ3JvdXBSZWdleCksIGRlY2ltYWxNYXRjaCA9IHZhbC5tYXRjaChkZWNpbWFsUmVnZXgpO1xuICAgIGlmIChncm91cE1hdGNoICYmIGdyb3VwTWF0Y2gubGVuZ3RoID09IDEgJiYgKCFkZWNpbWFsTWF0Y2ggfHwgZGVjaW1hbE1hdGNoLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdmFsLnJlcGxhY2UoZ3JvdXBSZWdleCwgJy4nKTtcblxuICAgIGlmIChkZWNpbWFsTWF0Y2ggJiYgZGVjaW1hbE1hdGNoLmxlbmd0aCA9PSAxICYmICghZ3JvdXBNYXRjaCB8fCBncm91cE1hdGNoLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdmFsLnJlcGxhY2UoZGVjaW1hbFJlZ2V4LCAnLicpO1xuXG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ25nSW5wdXRDdXJyZW5jeScpLmRpcmVjdGl2ZSgnbmdJbnB1dEN1cnJlbmN5JywgWyckbG9jYWxlJywnJGZpbHRlcicsJ25nSW5wdXRDdXJyZW5jeVNlcnZpY2UnLCckdGltZW91dCcsIGZ1bmN0aW9uKCRsb2NhbGUswqAkZmlsdGVyLCB1dGlsLCAkdGltZW91dCkge1xuICB2YXIgbGluayA9IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJG5nTW9kZWwpe1xuXG4gICAgdmFyIG9wdHMgPSB7XG4gICAgICB1cGRhdGVPbjogJ2JsdXIgZW50ZXInLFxuICAgICAgdXBkYXRlT25EZWZhdWx0OiBmYWxzZVxuICAgIH07XG4gICAgaWYgKCRuZ01vZGVsLiRvcHRpb25zICE9PSBudWxsICYmICRuZ01vZGVsLiRvcHRpb25zICE9PSB1bmRlZmluZWQpXG4gICAgICBvcHRzID0gJG5nTW9kZWwuJG9wdGlvbnMuY3JlYXRlQ2hpbGQob3B0cyk7XG5cbiAgICAkbmdNb2RlbC4kb3B0aW9ucyA9IG9wdHM7XG5cbiAgICB2YXIgZmlsdGVyID0gJGZpbHRlcignY3VycmVuY3knKTtcbiAgICAkbmdNb2RlbC4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uIGZyb21Nb2RlbFRvVmlldyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZpbHRlcih2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAkbmdNb2RlbC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHV0aWwucHJlZm9ybWF0VmFsdWUodmFsdWUpO1xuXG4gICAgICB2YXIgY3VycmVuY3kgPSB1dGlsLnRvRmxvYXQoZmlsdGVyKHZhbHVlKSk7XG4gICAgICBpZiAodXRpbC5pc1ZhbGlkKGN1cnJlbmN5KSkge1xuICAgICAgICAkbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKGZpbHRlcihjdXJyZW5jeSkpO1xuICAgICAgICAkbmdNb2RlbC4kcmVuZGVyKCk7XG4gICAgICAgIHJldHVybiBjdXJyZW5jeTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRlbGVtZW50Lm9uKCdibHVyJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmICgkbmdNb2RlbC4kdmlld1ZhbHVlID09PSAkbmdNb2RlbC4kbW9kZWxWYWx1ZSlcbiAgICAgICAgJGVsZW1lbnQudmFsKGZpbHRlcigkbmdNb2RlbC4kbW9kZWxWYWx1ZSkpO1xuICAgIH0pO1xuXG4gICAgJGVsZW1lbnQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmICh1dGlsLmlzVmFsaWQoJG5nTW9kZWwuJG1vZGVsVmFsdWUpKSB7XG4gICAgICAgICRuZ01vZGVsLiRzZXRWaWV3VmFsdWUoJG5nTW9kZWwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAkbmdNb2RlbC4kcmVuZGVyKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkbmdNb2RlbC4kdmFsaWRhdG9ycy5jdXJyZW5jeSA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUpIHtcbiAgICAgIHJldHVybiB1dGlsLmlzVmFsaWQobW9kZWxWYWx1ZSk7XG4gICAgfTtcblxuICB9O1xuICByZXR1cm4ge1xuICAgICdyZXN0cmljdCc6ICdBJyxcbiAgICAncmVxdWlyZSc6ICduZ01vZGVsJyxcbiAgICAnbGluayc6IGxpbmtcbiAgfTtcbn1dKTtcbiJdfQ==
