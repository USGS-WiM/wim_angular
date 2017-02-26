//http://txpub.usgs.gov/DSS/search_api/1.0/dataService/dataService.ashx/search?term=05454500&state=%25&topN=100&LATmin=-90&LATmax=90&LONmin=-180&LONmax=180&includeGNIS=true&includeState=true&includeUsgsSiteSW=true&includeUsgsSiteGW=true&includeUsgsSiteSP=false&includeUsgsSiteAT=false&includeUsgsSiteOT=false&includeZIPcodes=true&includeAREAcodes=true&useCommonGnisClasses=false
//------------------------------------------------------------------------------
//----- RegionService -----------------------------------------------------
//------------------------------------------------------------------------------

//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+

// copyright:   2015 WiM - USGS

//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  The service agent is responsible for initiating service calls, 
//             capturing the data that's returned and forwarding the data back to 
//             the requester. 
//          
//discussion:
//
//https://docs.angularjs.org/api/ng/service/$http

//Comments
//03.26.2015 jkn - Created
//02.26.2017 mjs - updated to use USGS search API v2

//Import

module WiM.Services {
    'use strict'

    declare var search_api;
    export var onSelectedAreaOfInterestChanged: string = "onSelectedAreaOfInterestChanged";

    export interface ISearchAPIOutput {
        properties: Object;
        geometry: Object;
        type: string;
    }

    export class SearchAPIEventArgs extends WiM.Event.EventArgs {
        //properties
        public selectedAreaOfInterest: ISearchAPIOutput;
        constructor(aoi: ISearchAPIOutput) {
            super();
            this.selectedAreaOfInterest = aoi;
        }

    }
    class SearchLocation implements ISearchAPIOutput {
        public properties: Object;
        public geometry: Object;
        public type: string;

        constructor(prop: Object, geom: Object, tp: string) {
            this.properties = prop;
            this.geometry = geom;
            this.type = tp;
        }
    }

    class SearchAPIService extends HTTPServiceBase {
        
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor($http: ng.IHttpService, private $q: ng.IQService, private eventManager:Event.IEventManager) {
            super($http, configuration.baseurls['SearchAPI']);
            this.eventManager.AddEvent<SearchAPIEventArgs>(onSelectedAreaOfInterestChanged);
            this.init();
            this.checkSearchAPI(); 
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public checkSearchAPI() {

            if (search_api) this.setSearchAPI();
            else console.error('The USGS Search API failed to load');
        }

        public setSearchAPI() {

            var widgetObj = search_api.create("searchBox")
                .setOpts({
                    "size": "sm",
                    "include_usgs_sw": true,
                    "include_usgs_gw": true,
                    "include_usgs_sp": true,
                    "include_usgs_at": true,
                    "include_usgs_ot": true,
                    "include_huc2": true,
                    "include_huc4": true,
                    "include_huc6": true,
                    "include_huc8": true,
                    "include_huc10": true,
                    "include_huc12": true
                    //...more options (defaults used for omitted options)...
                })
                .on("search", function () {
                    // close any popups
                    //map.closePopup();
                })
                .on("result", (lastLocationFound) => {

                    //console.log('found a location', lastLocationFound);
                    //send this data to region service
                    this.eventManager.RaiseEvent(onSelectedAreaOfInterestChanged, this, new SearchAPIEventArgs(new SearchLocation(lastLocationFound.result.properties, lastLocationFound.result.geometry, lastLocationFound.result.type)));
                })
                .on("failure", function () {
                    // give alert dialog
                    alert("No location matching the entered text could be found.");
                });
        }
        
        //HelperMethods
        //-+-+-+-+-+-+-+-+-+-+-+-
        private init() {
        }

    }//end class

    factory.$inject = ['$http', '$q', 'WiM.Event.EventManager'];
    function factory($http: ng.IHttpService, $q: ng.IQService, eventManager:Event.IEventManager) {
        return new SearchAPIService($http, $q, eventManager)
    }
    angular.module('WiM.Services')
        .factory('WiM.Services.SearchAPIService', factory)
}//end module 