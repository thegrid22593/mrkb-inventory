(function(){
    'use strict';

    angular
        .module('mrkb')
        .controller('BuildingMapController', BuildingMapController);

    function BuildingMapController ($log, $state, BuildingResultModel, $timeout){
        var vm = this;
        
        vm.mapModel = BuildingResultModel;
        vm.mapModel.currentBldgID = $state.params.buildingID;
        
        vm.navigateToBuildingState = function(bldgNum){
            if(!BuildingResultModel.expanded){
                $timeout(function(){
                    BuildingResultModel.expanded = true;
                    BuildingResultModel.shiftMap = true;
                }, 50);
            }

            BuildingResultModel.detailExpanded = false;

            // reset filter by building names and plan types array
            BuildingResultModel.currentBldgNames = [''];
            BuildingResultModel.FloorPlanTypeAvailability = [''];

            $state.go('building.overview', { buildingID:bldgNum });
        };

        // Navigate to landing
        vm.navigateToLanding = function(event){
            event.preventDefault();

            BuildingResultModel.detailExpanded  = false;

            $timeout(function(){
                BuildingResultModel.expanded = false;
                BuildingResultModel.shiftMap = false;
            },50);

            $state.go('building.landing');
        }
    }

})();
