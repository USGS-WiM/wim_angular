var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            function SearchLocation(prop, geom, tp) {
                this.properties = prop;
                this.geometry = geom;
                this.type = tp;
            }
            return SearchLocation;
        }());
        var SearchAPIService = (function (_super) {
            __extends(SearchAPIService, _super);
            function SearchAPIService($http, $q, eventManager) {
                _super.call(this, $http, configuration.baseurls['SearchAPI']);
                this.$q = $q;
                this.eventManager = eventManager;
                this.eventManager.AddEvent(Services.onSelectedAreaOfInterestChanged);
                this.init();
                this.checkSearchAPI();
            }
            SearchAPIService.prototype.checkSearchAPI = function () {
                if (search_api)
                    this.setSearchAPI();
                else
                    console.error('The USGS Search API failed to load');
            };
            SearchAPIService.prototype.setSearchAPI = function () {
                var _this = this;
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
                })
                    .on("search", function () {
                })
                    .on("result", function (lastLocationFound) {
                    _this.eventManager.RaiseEvent(Services.onSelectedAreaOfInterestChanged, _this, new SearchAPIEventArgs(new SearchLocation(lastLocationFound.result.properties, lastLocationFound.result.geometry, lastLocationFound.result.type)));
                })
                    .on("failure", function () {
                    alert("No location matching the entered text could be found.");
                });
            };
            SearchAPIService.prototype.init = function () {
            };
            return SearchAPIService;
        }(Services.HTTPServiceBase));
        factory.$inject = ['$http', '$q', 'WiM.Event.EventManager'];
        function factory($http, $q, eventManager) {
            return new SearchAPIService($http, $q, eventManager);
        }
        angular.module('WiM.Services')
            .factory('WiM.Services.SearchAPIService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=SearchAPIService.js.map