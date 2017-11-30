(function(){
    'use strict';

    angular
        .module('mrkb')
        .controller('BuildingOverviewController', BuildingOverviewController);

    function BuildingOverviewController($log, $state, $stateParams, BuildingResultModel, $timeout){
        var vm = this;
        vm.overviewModel = BuildingResultModel;

        // set BuildingResultModel for current building number to building ID passed in from state params
        console.log('$stateParams: ', $state.params.buildingID);

        BuildingResultModel.currentBldgID = $state.params.buildingID;

        // detail panel with building ID as param
        vm.viewDetail = function(id){
            $timeout(function(){
                BuildingResultModel.detailExpanded = true;
            },50);

            $state.go('building.detail', { buildingID:$state.params.buildingID, id:id });
        };

        // Static floor plan items
        vm.floorPlanItems = [
            {
                icon: 'icon-makoa-coaster',
                name: 'Makoa',
                bedroom: '3 Bedroom'
            },
            {
                icon: 'icon-leilani-coaster',
                name: 'Leilani',
                bedroom: '3 Bedroom + Den'
            },
            {
                icon: 'icon-kahua-coaster',
                name: 'Kahua',
                bedroom: '4 Bedroom'
            }
        ];

        // Set Active Floor Plan Filter
        vm.floorPlanItemsActive = vm.floorPlanItems;

        vm.setActive = function(filterItem) {
            vm.floorPlanItemsActive = filterItem;
        };

        vm.residenceItemsActive = BuildingResultModel.allBuildings;

        // Set Active Residence Unit
        vm.setActiveResidence = function(id) {
            vm.residenceItemsActive = id;
        };

        vm.AvailabiltyOptions = [
            {
                availability: 'available'
            },
            {
                availability: 'sold'
            },
            {
                availability: 'pending'
            }
        ];

        vm.filterByFloorPlan = function(name){
            // Remove default class from the three floorplan filters
            vm.overviewModel.filterFloorplanItemDefault = false;

            BuildingResultModel.currentBldgNames = [];
            BuildingResultModel.FloorPlanTypeAvailability = [''];
            BuildingResultModel.currentBldgNames.push(name.toLowerCase());
        };

        vm.filterByAvailability = function(availability){
            BuildingResultModel.FloorPlanTypeAvailability = [];
            BuildingResultModel.FloorPlanTypeAvailability.push(availability);
        };

        vm.resetFilters = function () {
            BuildingResultModel.FloorPlanTypeAvailability = [''];
        };
    }
})();
