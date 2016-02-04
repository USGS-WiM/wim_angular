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

//Import

module WiM.Services {
    'use strict'

    declare var search_api;
    export var onSelectedAreaOfInterestChanged: string = "onSelectedAreaOfInterestChanged";

    export interface ISearchAPIOutput extends Models.IPoint{
        Name: string; //name
        Category: string; //category
        State: string; //state
        County: string; //county
        Elevation: number;  //elev in feet
        Id: string; //GNIS feature ID
        Source: string; //Database source
    }
    export interface ISearchAPIService {
        getLocations(searchTerm: string): ng.IPromise<Array<ISearchAPIOutput>>;  
    }
    export interface ISearchConfig {
        LATmin: number;
        LATmax: number;
        LONmin: number;
        LONmax: number;
        includeGNIS: boolean;
        useCommonGnisClasses: boolean;
        includeUsgsSiteSW: boolean;
        includeUsgsSiteGW: boolean;
        includeUsgsSiteSP: boolean;
        includeUsgsSiteAT: boolean;
        includeUsgsSiteOT: boolean;
        includeZIPcodes: boolean;
        includeAREAcodes: boolean;
        includeState: boolean;
        topN: number;
        debug: boolean;
        term: string;
        state: string;
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
        public Name: string; //name
        public Category: string; //category
        public State: string; //state
        public County: string; //county
        public Longitude: number;  //longitude geographic dd;
        public Latitude: number;  //latitude geographic decimal degrees;
        public crs: string;
        public Elevation: number;  //elev in feet
        public Id: string; //GNIS feature ID
        public Source: string; //Database source
        
        constructor(nm:string, ct:string, st:string, lat:number, long:number) {
            this.Name = nm;
            this.Category = ct;
            this.State = st;
            this.Latitude = lat;
            this.Longitude = long;
            this.crs = "4326";
        }
    }
    class SearchConfig implements ISearchConfig {
        public LATmin: number;
        public LATmax: number;
        public LONmin: number;
        public LONmax: number;
        public includeGNIS: boolean;
        public useCommonGnisClasses: boolean;
        public includeUsgsSiteSW: boolean;
        public includeUsgsSiteGW: boolean;
        public includeUsgsSiteSP: boolean;
        public includeUsgsSiteAT: boolean;
        public includeUsgsSiteOT: boolean;
        public includeZIPcodes: boolean;
        public includeAREAcodes: boolean;
        public includeState: boolean;
        public topN: number;
        public debug: boolean;
        public term: string;
        public state: string;
        constructor() {
        }
    }

    class SearchAPIService extends HTTPServiceBase implements ISearchAPIService {
        
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public config: ISearchConfig;  

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor($http: ng.IHttpService, private $q: ng.IQService, private eventManager:Event.IEventManager) {
            super($http, configuration.baseurls['SearchAPI']);
            this.eventManager.AddEvent<SearchAPIEventArgs>(onSelectedAreaOfInterestChanged);
            this.init();
            this.loadSearchAPI(); 
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public loadSearchAPI() {

            var myScript = document.createElement('script');
            myScript.src = 'http://txpub.usgs.gov/DSS/search_api/1.1/api/search_api.min.js';
            myScript.onload = () => {
                //console.log('search api js loaded.');
                this.setSearchAPI();
            };
            document.body.appendChild(myScript);
        }
        public setSearchAPI() {
            // setup must be done after the search_api is loaded and ready ("load" event triggered)
            search_api.on("load",() => {
                //console.log('search api onload event');

                // OPTIONAL: set search_api options (case-sensitive)
                search_api.setOpts({
                    "textboxPosition": "user-defined",
                    "theme": "user-defined",
                    "DbSearchIncludeUsgsSiteSW": true,
                    "DbSearchIncludeUsgsSiteGW": true,
                    "DbSearchIncludeUsgsSiteSP": true,
                    "DbSearchIncludeUsgsSiteAT": true,
                    "DbSearchIncludeUsgsSiteOT": true
                    //...more options (defaults used for omitted options)...
                });
                
                // OPTIONAL: define what to do when a search is started
                search_api.on("before-search", function () {
                    // close any popups
                    //map.closePopup();
                });
                
                // REQUIRED: define what to do when a location is found
                search_api.on("location-found", (lastLocationFound) => {

                    //console.log('found a location', lastLocationFound);
                    //send this data to region service
                    this.eventManager.RaiseEvent(onSelectedAreaOfInterestChanged, this, new SearchAPIEventArgs(new SearchLocation(lastLocationFound.name, lastLocationFound.category, lastLocationFound.state, lastLocationFound.y, lastLocationFound.x)));
                });
                
                // OPTIONAL: define what to do when no location is found
                search_api.on("no-result", function () {
                    // give alert dialog
                    alert("No location matching the entered text could be found.");
                });
                
                // OPTIONAL: define what to do when a search times out
                search_api.on("timeout", function () {
                    // give alert dialog
                    alert("The search operation timed out.");
                });
            });

        }

        public getLocations(searchTerm: string):ng.IPromise<Array<ISearchAPIOutput>> {

            this.config.term = searchTerm;
            var request: WiM.Services.Helpers.RequestInfo = new WiM.Services.Helpers.RequestInfo("/search");
            request.params = {
                term: this.config.term,
                state: this.config.state,
                includeGNIS: this.config.includeGNIS,
                useCommonGnisClasses: this.config.useCommonGnisClasses,
                includeUsgsSiteSW: this.config.includeUsgsSiteSW,
                includeUsgsSiteGW: this.config.includeUsgsSiteGW,
                includeUsgsSiteSP: this.config.includeUsgsSiteSP,
                includeUsgsSiteAT: this.config.includeUsgsSiteAT,
                includeUsgsSiteOT: this.config.includeUsgsSiteOT,
                includeZIPcodes: this.config.includeZIPcodes,
                includeAREAcodes: this.config.includeAREAcodes,
                includeState: this.config.includeState,
                topN: this.config.topN,
                debug: this.config.debug
            }

            return this.Execute<Array<ISearchAPIOutput>>(request).then(
                (response: any) => {                    
                    return response.data.map((item) => {
                        return new SearchLocation(item.nm, item.ct, item.st, item.y,item.x)});
                },(error) => {
                    return this.$q.reject(error.data)
                });
        }
        
        //HelperMethods
        //-+-+-+-+-+-+-+-+-+-+-+-
        private init() {
            this.config = new SearchConfig();
            this.config.includeGNIS = true;
            this.config.useCommonGnisClasses = true;
            this.config.includeUsgsSiteSW = true;
            this.config.includeUsgsSiteGW = true;
            this.config.includeUsgsSiteSP = true;
            this.config.includeUsgsSiteAT = true;
            this.config.includeUsgsSiteOT = true;
            this.config.includeZIPcodes = true;
            this.config.includeAREAcodes = true;
            this.config.includeState = true;
            this.config.topN = 100;
            this.config.debug = false;
            this.config.term = '';
            this.config.state = '';
        }

    }//end class

    factory.$inject = ['$http', '$q', 'WiM.Event.EventManager'];
    function factory($http: ng.IHttpService, $q: ng.IQService, eventManager:Event.IEventManager) {
        return new SearchAPIService($http, $q, eventManager)
    }
    angular.module('WiM.Services')
        .factory('WiM.Services.SearchAPIService', factory)
}//end module 