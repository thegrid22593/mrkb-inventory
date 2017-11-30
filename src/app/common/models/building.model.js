(function(){
    'use strict';

    angular
        .module('mrkb')
        .service('BuildingResultModel', BuildingResultModel);

    function BuildingResultModel(BuildingService){
        var vm                          = this;
        vm.expanded                     = false;
        vm.detailExpanded               = false;
        vm.shiftMap                     = false;
        // Building ID used for identifying building location on map & buildings 1, 2, & 5
        vm.currentBldgID                = 1;
        vm.currentBldgName              = null;
        // Unit in Building
        vm.currentUnitID                = null;
        vm.FloorPlanTypeAvailability    = [''];
        vm.currentBldgNames             = [''];
        vm.sortBy                       = '';
        vm.filterFloorplanItemDefault   = true;

        BuildingService.getAllBuildingData().then(function(result){
            vm.allBuildings = result.buildings;
        });

        BuildingService.getBuildingGalleryData().then(function(result){
           vm.detailModel = result.galleries;
        });
    }

})();
