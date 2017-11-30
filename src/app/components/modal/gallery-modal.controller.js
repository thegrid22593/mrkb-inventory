(function(){
    'use strict';

    angular
        .module('mrkb')
        .controller('GalleryModalController', GalleryModalController);

    function GalleryModalController($uibModalInstance, data, BuildingResultModel, lodash, $timeout){
        var vm = this;

        vm.properties           = data;
        vm.detailModel          = BuildingResultModel.detailModel;
        vm.currentGallery       = lodash.find(vm.detailModel, { 'name':vm.properties.name});
        vm.fpoImage             = '/assets/images/buildings/mrkb-birdseye.jpg';
        vm.properties.viewImage = data.viewImage;

        vm.slickConfig = {
            event: {
                init: function (event, slick) {
                    // if no floor plan param is passed to view gallery method
                    if(vm.properties.floorPlanImage !==''){
                        $('.property-img').remove();
                        // -2 for infinite carousel where additional images are appended and prepended to slick track
                        slick.slickGoTo($('.slick-track img').length - 2);
                    }

                    $timeout(function(){
                        $('.slick-slider').addClass('active');
                    }, 300);
                }
            },
            mobileFirst: true
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
