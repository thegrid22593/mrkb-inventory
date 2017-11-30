(function() {
    'use strict';

    angular
        .module('mrkb')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('building', {
                abstract: true,
                'url': '/bldg',
                views: {
                    '': {
                        templateUrl: 'app/building/index.html',
                        controller: 'BuildingController as building'
                    },
                    'building-overview@building': {
                        templateUrl: 'app/building/overview/overview.html',
                        controller: 'BuildingOverviewController as buildingOverview'
                    },
                    'building-map@building': {
                        templateUrl: 'app/building/map/map.html',
                        controller: 'BuildingMapController as buildingMap'
                    }
                }
            })

            .state('building.landing', {
                'url': '/landing',
                '': {
                    templateUrl: 'app/building/index.html',
                    controller: 'BuildingController as building'
                }
            })

            .state('building.overview', {
                'url': '/:buildingID',
                views: {
                    'building-overview@building': {
                        templateUrl: 'app/building/overview/overview.html',
                        controller: 'BuildingOverviewController as buildingOverview',
                        resolve: {
                            init: ['BuildingResultModel', '$timeout', function(BuildingResultModel, $timeout){
                                if(!BuildingResultModel.expanded){
                                    $timeout(function(){
                                        BuildingResultModel.expanded = true;
                                    },50);
                                }
                            }]
                        }
                    }
                }
            })

            .state('building.detail', {
                'url': '/:buildingID/:id',
                views: {
                    'building-detail@building': {
                        'templateUrl': 'app/building/detail/detail.html',
                        'controller': 'BuildingDetailController as buildingDetail',
                        resolve: {
                            init: ['BuildingService', 'BuildingResultModel', '$timeout', '$state', '$stateParams', 'lodash', function(BuildingService, BuildingResultModel, $timeout, $state, $stateParams, lodash){
                                //if(typeof BuildingResultModel.allBuildings == 'undefined'){
                                //    BuildingService.getAllBuildingData().then(function(result){
                                //        BuildingResultModel.allBuildings = result.buildings;
                                //        console.log('promise: ', BuildingResultModel.allBuildings);
                                //    });
                                //}

                                if(BuildingResultModel.currentBldgID == null || typeof BuildingResultModel.currentBldgID == 'undefined'){
                                    BuildingResultModel.currentBldgID = $stateParams.buildingID;
                                }


                                if(BuildingResultModel.currentUnitID == null || typeof BuildingResultModel.currentUnitID == 'undefined'){
                                    BuildingResultModel.currentUnitID = $stateParams.id;
                                }

                                if(!BuildingResultModel.expanded && !BuildingResultModel.detailExpanded){
                                    $timeout(function(){
                                        BuildingResultModel.expanded = true;
                                        BuildingResultModel.detailExpanded = true;
                                    },50);
                                }
                            }]
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/mrkb-inventory/bldg/landing');
    }

})();
