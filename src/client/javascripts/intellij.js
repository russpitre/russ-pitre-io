var keymapApp = angular.module('keymapApp', []);

keymapApp.controller('KeymapListController', ['$scope','$http','$log', '$document', function ($scope, $http, $log, $document) {

    'use strict';

    $http.get('/data/keymaps.json').success(function(data) {
        $scope.keymaps = data;
    });

    $scope.sortOn = 'type';
    $scope.filter = {};

    $scope.css = function (key) {

        switch(key.type) {

        case 'Find' :
            return 'teal';
        case 'Navigation' :
            return 'red';
        case 'File' :
            return 'green';
        case 'Code' :
            return 'blue';
        case 'Refactor' :
            return 'purple';
        default :
            return '';
        }
    };

    $scope.doFilter = function (predicate) {
        $scope.filter = { 'type' : predicate };
    };

    $document.keydown(function(e){

        $log.info('key press event', e.keyCode);

        var filter;

        switch(e.keyCode) {

        case 70:
            filter = 'Find';
            break;
        case 78:
            filter = 'Navigation';
            break;
        case 73:
            filter = 'File';
            break;
        case 67:
            filter = 'Code';
            break;
        case 82:
            filter = 'Refactor';
            break;
        case 27:
            filter = '';
            break;
        }

        if (typeof filter !== 'undefined') {
            $scope.$apply( function() { $scope.doFilter(filter); } );
        }

    });

}]);
