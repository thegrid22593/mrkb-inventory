(function(){

    'use strict';

    angular
        .module('mrkb')
        .controller('BuildingController', BuildingController);

    function BuildingController(BuildingResultModel){
        var vm = this;

        vm.buildingModel = BuildingResultModel;

        // if(is.mobile()){
        //     $('.mobile-support').addClass('enabled');
        // }

        // else {
        //     $('.mobile-support').removeClass('enabled');
        // }
    }

})();
