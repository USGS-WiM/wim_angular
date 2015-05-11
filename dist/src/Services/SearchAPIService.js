var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        'use strict';
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
        })();
        var SearchConfig = (function () {
            function SearchConfig() {
            }
            return SearchConfig;
        })();
        var SearchAPIService = (function (_super) {
            __extends(SearchAPIService, _super);
            function SearchAPIService($http, $q) {
                _super.call(this, $http, configuration.baseurls['SearchAPI']);
                this.$q = $q;
                this._onSelectedAreaOfInterestChanged = new WiM.Event.Delegate();
                this.init();
            }
            Object.defineProperty(SearchAPIService.prototype, "onSelectedAreaOfInterestChanged", {
                get: function () {
                    return this._onSelectedAreaOfInterestChanged;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SearchAPIService.prototype, "selectedAreaOfInterest", {
                get: function () {
                    return this._selectedAreaOfInterest;
                },
                set: function (val) {
                    if (this._selectedAreaOfInterest !== val) {
                        this._selectedAreaOfInterest = val;
                        this._onSelectedAreaOfInterestChanged.raise(null, WiM.Event.EventArgs.Empty);
                    }
                },
                enumerable: true,
                configurable: true
            });
            SearchAPIService.prototype.loadLocations = function (searchTerm) {
                var _this = this;
                this.areaOfInterestList.length = 0;
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
                    response.data.map(function (item) {
                        _this.areaOfInterestList.push(new SearchLocation(item.nm, item.ct, item.st, item.y, item.x));
                    });
                }, function (error) {
                    return _this.$q.reject(error.data);
                });
            };
            SearchAPIService.prototype.init = function () {
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
            };
            return SearchAPIService;
        })(Services.HTTPServiceBase);
        factory.$inject = ['$http', '$q'];
        function factory($http, $q) {
            return new SearchAPIService($http, $q);
        }
        angular.module('WiM.Services').factory('WiM.Services.SearchAPIService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=SearchAPIService.js.map