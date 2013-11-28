/* globals dojo */

'use strict';

/**
 * Import dojo and ESRI modules.
 */
var esri = dojo.require('esri.map');

/**
 * Variables, obviously.
 */
var map;

/**
 * Initializes the map.
 */
function init() {

    map = new esri.Map('themap', {
        center: [-56.049, 38.485],
        zoom: 3,
        basemap: 'streets'
    });

}

dojo.ready(init);


