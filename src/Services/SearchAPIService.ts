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
        onSelectedAreaOfInterestChanged: WiM.Event.Delegate<WiM.Event.EventArgs>;
        selectedAreaOfInterest: ISearchAPIOutput;
        areaOfInterestList: Array<ISearchAPIOutput>;
        loadLocations(searchTerm: string);
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
        //Events
        private _onSelectedAreaOfInterestChanged: WiM.Event.Delegate<WiM.Event.EventArgs>;
        public get onSelectedAreaOfInterestChanged(): WiM.Event.Delegate<WiM.Event.EventArgs> {
            return this._onSelectedAreaOfInterestChanged;
        }
        
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        private _selectedAreaOfInterest: WiM.Services.ISearchAPIOutput;
        public set selectedAreaOfInterest(val: WiM.Services.ISearchAPIOutput) {
            if (this._selectedAreaOfInterest !== val) {
                this._selectedAreaOfInterest = val;
                this._onSelectedAreaOfInterestChanged.raise(null, WiM.Event.EventArgs.Empty);
            }
        }
        public get selectedAreaOfInterest(): WiM.Services.ISearchAPIOutput {
            return this._selectedAreaOfInterest
        }
        public areaOfInterestList: Array<ISearchAPIOutput>;
        public config: ISearchConfig;      
                
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor($http: ng.IHttpService, private $q: ng.IQService) {
            super($http, configuration.baseurls['SearchAPI']);
            this.init();
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public loadLocations(searchTerm: string) {
            this.areaOfInterestList.length = 0;//clear array

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
                     response.data.map((item) => {
                        this.areaOfInterestList.push( new SearchLocation(item.nm, item.ct, item.st, item.y,item.x))});
                },(error) => {
                    return this.$q.reject(error.data)
                });
        }
        
        //HelperMethods
        //-+-+-+-+-+-+-+-+-+-+-+-
        private init() {
            this.areaOfInterestList = [];
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

    factory.$inject = ['$http', '$q'];
    function factory($http: ng.IHttpService, $q: ng.IQService) {
        return new SearchAPIService($http, $q)
    }
    angular.module('WiM.Services')
        .factory('WiM.Services.SearchAPIService', factory)
}//end module 