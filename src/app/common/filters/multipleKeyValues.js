(function(){
  'use strict';

  angular
    .module('mrkb')
    .filter('filterMultipleKeyValues', function ($filter) {
      var comparator = function (received, expected) {
        if (angular.isUndefined(received)) {
          // No substring matching against `undefined`
          return false;
        }
        if ((received === null) || (expected === null)) {
          // No substring matching against `null`; only match against `null`
          return received === expected;
        }
        if ((angular.isObject(expected) && !angular.isArray(expected)) || (angular.isObject(received) )) {
          // Should not compare primitives against objects, unless they have custom `toString` method
          return false;
        }

        received = angular.lowercase('' + received);
        if (angular.isArray(expected)) {
          var match = false;
          expected.forEach(function (e) {
            e = angular.lowercase('' + e);
            if (received.indexOf(e) !== -1) {
              match = true;
            }
          });
          return match;
        } else {
          expected = angular.lowercase('' + expected);
          return received.indexOf(expected) !== -1;
        }
      };
      return function (campaigns, filters) {
        return $filter('filter')(campaigns, filters, comparator);
      };
    });

})();
