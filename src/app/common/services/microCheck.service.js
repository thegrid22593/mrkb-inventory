angular.module('isJS',[])
    .factory('is',function($window){
        return $window.is;
    });
