(function(){
    'use strict';

    angular
        .module('mrkb')
        .controller('BuildingDetailController', BuildingDetailController);

    function BuildingDetailController($stateParams, BuildingResultModel, lodash, $uibModal, $timeout){
        var vm = this;

        $timeout(function(){
            vm.model = lodash.find(BuildingResultModel.allBuildings, { 'id':$stateParams.id });
        }, 50);

        if(BuildingResultModel.currentBldgID == null || typeof BuildingResultModel.currentBldgID == 'undefined'){
            BuildingResultModel.currentBldgID = $stateParams.buildingID;
        }

        if(BuildingResultModel.currentUnitID == null || typeof BuildingResultModel.currentUnitID == 'undefined'){
            BuildingResultModel.currentUnitID = $stateParams.id;
        }

        vm.viewGallery = function(name, floorPlanImage, image){
            if(typeof floorPlanImage == 'undefined'){
                floorPlanImage = '';
            }

            $uibModal.open({
                templateUrl: 'app/components/modal/gallery.html',
                controller: 'GalleryModalController',
                controllerAs: 'galleryModal',
                resolve: {
                    data: function(){
                        return {
                            name: name,
                            floorPlanImage: floorPlanImage,
                            viewImage: image
                        }
                    }
                }
            });
        }
    }
})();
