//http://txpub.usgs.gov/DSS/search_api/1.0/dataService/dataService.ashx/search?term=05454500&state=%25&topN=100&LATmin=-90&LATmax=90&LONmin=-180&LONmax=180&includeGNIS=true&includeState=true&includeUsgsSiteSW=true&includeUsgsSiteGW=true&includeUsgsSiteSP=false&includeUsgsSiteAT=false&includeUsgsSiteOT=false&includeZIPcodes=true&includeAREAcodes=true&useCommonGnisClasses=false
//------------------------------------------------------------------------------
//----- RegionService -----------------------------------------------------
//------------------------------------------------------------------------------
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        'use strict';
        Services.onSelectedAreaOfInterestChanged = "onSelectedAreaOfInterestChanged";
        var SearchAPIEventArgs = (function (_super) {
            __extends(SearchAPIEventArgs, _super);
            function SearchAPIEventArgs(aoi) {
                _super.call(this);
                this.selectedAreaOfInterest = aoi;
            }
            return SearchAPIEventArgs;
        }(WiM.Event.EventArgs));
        Services.SearchAPIEventArgs = SearchAPIEventArgs;
        var SearchLocation = (function () {
            function SearchLocation(nm, ct, st, lat, long) {
                this.Name = nm;
                this.Category = ct;
                this.State = st;
                this.Latitude = lat;
                this.Longitude = long;
                this.crs = "4326";
            }
            return SearchLocation;
        }());
        var SearchConfig = (function () {
            function SearchConfig() {
            }
            return SearchConfig;
        }());
        var SearchAPIService = (function (_super) {
            __extends(SearchAPIService, _super);
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function SearchAPIService($http, $q, eventManager) {
                _super.call(this, $http, configuration.baseurls['SearchAPI']);
                this.$q = $q;
                this.eventManager = eventManager;
                this.eventManager.AddEvent(Services.onSelectedAreaOfInterestChanged);
                this.init();
                this.loadSearchAPI();
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            SearchAPIService.prototype.loadSearchAPI = function () {
                var _this = this;
                var myScript = document.createElement('script');
                myScript.src = 'http://txpub.usgs.gov/DSS/search_api/1.1/api/search_api.min.js';
                myScript.onload = function () {
                    //console.log('search api js loaded.');
                    _this.setSearchAPI();
                };
                document.body.appendChild(myScript);
            };
            SearchAPIService.prototype.setSearchAPI = function () {
                var _this = this;
                // setup must be done after the search_api is loaded and ready ("load" event triggered)
                search_api.on("load", function () {
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
                    });
                    // OPTIONAL: define what to do when a search is started
                    search_api.on("before-search", function () {
                        // close any popups
                        //map.closePopup();
                    });
                    // REQUIRED: define what to do when a location is found
                    search_api.on("location-found", function (lastLocationFound) {
                        //console.log('found a location', lastLocationFound);
                        //send this data to region service
                        _this.eventManager.RaiseEvent(Services.onSelectedAreaOfInterestChanged, _this, new SearchAPIEventArgs(new SearchLocation(lastLocationFound.name, lastLocationFound.category, lastLocationFound.state, lastLocationFound.y, lastLocationFound.x)));
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
            };
            SearchAPIService.prototype.getLocations = function (searchTerm) {
                var _this = this;
                this.config.term = searchTerm;
                var request = new WiM.Services.Helpers.RequestInfo("/search");
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
                };
                return this.Execute(request).then(function (response) {
                    return response.data.map(function (item) {
                        return new SearchLocation(item.nm, item.ct, item.st, item.y, item.x);
                    });
                }, function (error) {
                    return _this.$q.reject(error.data);
                });
            };
            //HelperMethods
            //-+-+-+-+-+-+-+-+-+-+-+-
            SearchAPIService.prototype.init = function () {
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
            };
            return SearchAPIService;
        }(HTTPServiceBase)); //end class
        factory.$inject = ['$http', '$q', 'WiM.Event.EventManager'];
        function factory($http, $q, eventManager) {
            return new SearchAPIService($http, $q, eventManager);
        }
        angular.module('WiM.Services')
            .factory('WiM.Services.SearchAPIService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module 
//# sourceMappingURL=SearchAPIService.js.map