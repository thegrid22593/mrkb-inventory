(function(){

    'use strict';

    angular
        .module('mrkb')
        .factory('BuildingService', BuildingService);

    function BuildingService($http){

        function getAllBuildingData(){
            return $http.get('app/fixtures/buildings.json')
                .then(function(response){
                    return response.data;
                });
        }

        function getBuildingGalleryData(){
            return $http.get('app/fixtures/buildings.json')
                .then(function(response){
                   return response.data;
                });
        }

        return {
            getAllBuildingData: getAllBuildingData,
            getBuildingGalleryData: getBuildingGalleryData
        };
    }

})();
