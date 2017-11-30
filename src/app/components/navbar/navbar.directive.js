(function() {
    'use strict';

    angular
        .module('mrkb')
        .directive('mrkbNavbar', mrkbNavbar);

    /** @ngInject */
    function mrkbNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'navBar',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController(BuildingResultModel, $state, $timeout) {
            var vm = this;

            vm.navBarModel = BuildingResultModel;
            
            vm.navBarModel.currentBldgID = $state.params.buildingID;
            
            vm.navItems = [
                {
                    "label": "Building",
                    "buildingNumber": 1,
                    "active": true
                },
                {
                    "label": "Building",
                    "buildingNumber": 2,
                    "active": false
                },
                {
                    "label": "Building",
                    "buildingNumber": 5,
                    "active": false
                }
            ];


            // Sets buildings 1,2 and 5 and toggles expands boolean which in turn toggles class on uiview
            vm.viewBuilding = function(buildingNumber){
                if(!BuildingResultModel.expanded){
                    $timeout(function(){
                        BuildingResultModel.expanded = true;
                        BuildingResultModel.shiftMap = true;
                    },50);
                }

                BuildingResultModel.detailExpanded = false;

                // reset filter by building names and plan types array
                BuildingResultModel.currentBldgNames = [''];
                BuildingResultModel.FloorPlanTypeAvailability = [''];

                $state.go('building.overview', { buildingID:buildingNumber });
            };


            // Navigate to landing, resets filtering to default
            vm.navigateToLanding = function(event){
                event.preventDefault();

                BuildingResultModel.expanded            = false;
                BuildingResultModel.detailExpanded      = false;
                BuildingResultModel.shiftMap            = false;

                // reset filter by building names array
                BuildingResultModel.currentBldgNames    = [''];
                BuildingResultModel.FloorPlanTypeAvailability = [''];

                $state.go('building.landing');
            }

        }
    }

})();
