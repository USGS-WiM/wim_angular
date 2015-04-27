if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
//# sourceMappingURL=String.js.map
//------------------------------------------------------------------------------
//----- Table ---------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  
//          
//discussion:
//
//Comments
//08.20.2014 jkn - Created
// Interface
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var Citation = (function () {
            // Constructor
            function Citation(title, author, imageSrc, url) {
                this.Title = title;
                this.Author = author;
                this.imgSrc = imageSrc;
                this.src = url;
            } //end constructor
            Citation.FromJSON = function (obj) {
                var Title = obj.hasOwnProperty("title") ? obj["title"] : "--";
                var Author = obj.hasOwnProperty("author") ? obj["author"] : "";
                var imgSrc = obj.hasOwnProperty("imgeSrc") ? obj["imgeSrc"] : "";
                var src = obj.hasOwnProperty("src") ? obj["src"] : "";
                return new Citation(Title, Author, imgSrc, src);
            }; //end FromJSON
            return Citation;
        })(); //end class
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=Citation.js.map
var StreamStats;
(function (StreamStats) {
    var Models;
    (function (Models) {
        // Class
        var KeyValue = (function () {
            // Constructor
            function KeyValue(k, v) {
                this.k = k;
                this.v = v;
                this.Key = k;
                this.Value = v;
            }
            return KeyValue;
        })();
    })(Models = StreamStats.Models || (StreamStats.Models = {}));
})(StreamStats || (StreamStats = {}));
//# sourceMappingURL=KeyValue.js.map
//------------------------------------------------------------------------------
//----- Table ---------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  
//          
//discussion:
//
//Comments
//08.20.2014 jkn - Created
// Class
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var Parameter = (function () {
            // Constructor
            function Parameter(n, v, c, d, u, limit) {
                this.name = n;
                this.value = v;
                this.code = c;
                this.unit = u;
                this.description = d;
                this.limits = limit;
            } //end constructor
            Parameter.FromJSON = function (obj) {
                var name = obj.hasOwnProperty("name") ? obj["name"] : "---";
                var descr = obj.hasOwnProperty("description") ? obj["description"] : "---";
                var code = obj.hasOwnProperty("code") ? obj["code"] : "---";
                var unit = obj.hasOwnProperty("unit") ? obj["unit"] : "---";
                var value = obj.hasOwnProperty("value") ? obj["value"] : -999;
                var limit = obj.hasOwnProperty("limits") && obj["limits"] != null ? Limit.FromJSON(obj["limits"]) : null;
                return new Parameter(name, value, code, descr, unit, limit);
            }; //end FromJSON
            return Parameter;
        })(); //end class
        // Class
        var Limit = (function () {
            // Constructor
            function Limit(min, max) {
                this.min = min;
                this.max = max;
            }
            Limit.FromJSON = function (obj) {
                var min = obj.hasOwnProperty("min") ? obj["min"] : -999;
                var max = obj.hasOwnProperty("max") ? obj["max"] : -999;
                return new Limit(min, max);
            }; //end FromJSON
            return Limit;
        })(); //end class
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=Parameter.js.map
//------------------------------------------------------------------------------
//----- Point ------------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  
//          
//discussion:
//
//Comments
//08.20.2014 jkn - Created
//Imports"
///<reference path="../Extensions/String.ts" />
// Interface
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var Point = (function () {
            function Point(lat, long, crs) {
                this.Latitude = lat;
                this.Longitude = long;
                this.crs = crs;
            }
            Point.prototype.ToEsriString = function () {
                return "{" + "x:{0},y:{1}".format(this.Longitude.toString(), this.Latitude.toString()) + "}";
            };
            Point.FromJson = function (json) {
                var lat = json.hasOwnProperty("Latitude") ? json["Latitude"] : -9999;
                var long = json.hasOwnProperty("Longitude") ? json["Longitude"] : -9999;
                var wkid = json.hasOwnProperty("wkid") ? json["wkid"] : "---";
                return new Point(lat, long, wkid);
            };
            return Point;
        })();
        Models.Point = Point; //end class
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=Point.js.map
//------------------------------------------------------------------------------
//----- AuthenticationBase -----------------------------------------------------
//------------------------------------------------------------------------------
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
        var AuthenticationServiceAgent = (function (_super) {
            __extends(AuthenticationServiceAgent, _super);
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function AuthenticationServiceAgent($http, $q, baseURL, u) {
                _super.call(this, $http, baseURL);
                this.User = u;
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            AuthenticationServiceAgent.prototype.SetBasicAuthentication = function (uri, password) {
                var request;
                request = new Services.Helpers.RequestInfo(uri);
                var authdata;
                try {
                    authdata = btoa(this.User.username + ":" + password);
                }
                catch (e) {
                    authdata = this.encode(this.User.username + ":" + password);
                }
                //set default Authorization header
                this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                //makes a request to verify authentication
                return this.Execute(request).then(function (response) {
                });
            };
            AuthenticationServiceAgent.prototype.SetTokenAuthentication = function (uri, password) {
                var _this = this;
                try {
                    var request = new Services.Helpers.RequestInfo(uri);
                    return this.Execute(request).then(function (response) {
                        //set default Authorization header
                        _this.$http.defaults.headers.common['Authorization'] = 'token ' + response.data;
                    });
                }
                catch (e) {
                }
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            AuthenticationServiceAgent.prototype.encode = function (input) {
                //http://plnkr.co/edit/H4SVl6?p=preview
                var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                try {
                    var output = "";
                    var chr1 = NaN;
                    var chr2 = NaN;
                    var chr3 = NaN;
                    var enc1 = NaN;
                    var enc2 = NaN;
                    var enc3 = NaN;
                    var enc4 = NaN;
                    var i = 0;
                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        }
                        else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = NaN;
                        enc1 = enc2 = enc3 = enc4 = NaN;
                    } while (i < input.length);
                    return output;
                }
                catch (e) {
                }
            };
            return AuthenticationServiceAgent;
        })(Services.HTTPServiceBase);
        Services.AuthenticationServiceAgent = AuthenticationServiceAgent; //end class
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=AuthenticationServiceBase.js.map
//------------------------------------------------------------------------------
//----- HTTPServiceBase ---------------------------------------------------------------
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
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        'use strict';
        var HTTPServiceBase = (function () {
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function HTTPServiceBase(http, baseURL) {
                this.baseURL = baseURL;
                this.$http = http;
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            HTTPServiceBase.prototype.Execute = function (request) {
                request.url = this.baseURL + request.url;
                return this.$http(request);
            };
            return HTTPServiceBase;
        })();
        Services.HTTPServiceBase = HTTPServiceBase; //end class
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module 
//# sourceMappingURL=HTTPServiceBase.js.map
//http://txpub.usgs.gov/DSS/search_api/1.0/dataService/dataService.ashx/search?term=05454500&state=%25&topN=100&LATmin=-90&LATmax=90&LONmin=-180&LONmax=180&includeGNIS=true&includeState=true&includeUsgsSiteSW=true&includeUsgsSiteGW=true&includeUsgsSiteSP=false&includeUsgsSiteAT=false&includeUsgsSiteOT=false&includeZIPcodes=true&includeAREAcodes=true&useCommonGnisClasses=false
//------------------------------------------------------------------------------
//----- RegionService -----------------------------------------------------
//------------------------------------------------------------------------------
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
        Services.SearchLocation = SearchLocation;
        var SearchAPIService = (function (_super) {
            __extends(SearchAPIService, _super);
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function SearchAPIService($http, $q) {
                _super.call(this, $http, configuration.baseurls['SearchAPI']);
                this.$q = $q;
                this.init();
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            SearchAPIService.prototype.getLocations = function (searchTerm) {
                var _this = this;
                var request = new WiM.Services.Helpers.RequestInfo("/search");
                request.params = {
                    term: searchTerm,
                    includeGNIS: this.includeGNIS,
                    useCommonGnisClasses: this.useCommonGnisClasses,
                    includeUsgsSiteSW: this.includeUsgsSiteSW,
                    includeUsgsSiteGW: this.includeUsgsSiteGW,
                    includeUsgsSiteSP: this.includeUsgsSiteSP,
                    includeUsgsSiteAT: this.includeUsgsSiteAT,
                    includeUsgsSiteOT: this.includeUsgsSiteOT,
                    includeZIPcodes: this.includeZIPcodes,
                    includeAREAcodes: this.includeAREAcodes,
                    includeState: this.includeState,
                    topN: this.topN,
                    debug: this.debug
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
                this.includeGNIS = true;
                this.useCommonGnisClasses = true;
                this.includeUsgsSiteSW = true;
                this.includeUsgsSiteGW = true;
                this.includeUsgsSiteSP = true;
                this.includeUsgsSiteAT = true;
                this.includeUsgsSiteOT = true;
                this.includeZIPcodes = true;
                this.includeAREAcodes = true;
                this.includeState = true;
                this.topN = 100;
                this.debug = false;
            };
            return SearchAPIService;
        })(Services.HTTPServiceBase); //end class
        factory.$inject = ['$http', '$q'];
        function factory($http, $q) {
            return new SearchAPIService($http, $q);
        }
        angular.module('WiM.Services').factory('WiM.Services.SearchAPIService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module 
//# sourceMappingURL=SearchAPIService.js.map
(function () {
    'use strict';
    angular.module('WiM.Services', []);
})();
//# sourceMappingURL=service.module.js.map
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        'use strict';
        var StateWatcherService = (function () {
            function StateWatcherService($rootScope) {
                this.$rootScope = $rootScope;
                $rootScope.$on('$stateChangeStart', this.stateChangeStart);
                $rootScope.$on('$stateChangeSuccess', this.stateChangeSuccess);
                $rootScope.$on('$stateChangeError', this.stateChangeError);
                $rootScope.$on('$stateNotFound', this.stateNotFound);
            }
            StateWatcherService.prototype.stateChangeStart = function (event, toState, toParams, fromState, fromParams) {
                console.log('state change start', event, toState, toParams, fromState, fromParams);
            };
            StateWatcherService.prototype.stateChangeSuccess = function (event, toState, toParams, fromState, fromParams) {
                console.log('state change success', event, toState, toParams, fromState, fromParams);
            };
            StateWatcherService.prototype.stateChangeError = function (event, toState, toParams, fromState, fromParams, error) {
                console.log('state change error', event, toState, toParams, fromState, fromParams, error);
            };
            StateWatcherService.prototype.stateNotFound = function (event, unfoundState, toParams, fromState, fromParams) {
                console.log('state not found', event, unfoundState, toParams, fromState, fromParams);
            };
            return StateWatcherService;
        })(); //end class
        factory.$inject = ['$rootScope'];
        function factory($rootScope) {
            return new StateWatcherService($rootScope);
        }
        angular.module('WiM.Services').factory('WiM.Services.StateWatcherService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=StateWatcherService.js.map
//------------------------------------------------------------------------------
//----- Timeseries ---------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  Represents the FDCTM model
//          
//discussion:
//
//Comments
//09.14.2014 jkn - Created
//Imports"
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var TimeSeries;
        (function (_TimeSeries) {
            var TimeSeries = (function () {
                // Constructor
                function TimeSeries() {
                }
                TimeSeries.FromJSON = function (jsn) {
                    var ts = new TimeSeries();
                    ts.Name = jsn.hasOwnProperty("Name") ? jsn["Name"] : null;
                    ts.SeriesID = jsn.hasOwnProperty("SeriesID") ? jsn["SeriesID"] : null;
                    ts.SeriesDescription = jsn.hasOwnProperty("SeriesDescription") ? jsn["SeriesDescription"] : null;
                    ts.ValueMax = jsn.hasOwnProperty("ValueMax") ? jsn["ValueMax"] : null;
                    ts.ValueMin = jsn.hasOwnProperty("ValueMin") ? jsn["ValueMin"] : null;
                    ts.StartDate = jsn.hasOwnProperty("StartDate") ? new Date(jsn["StartDate"]) : null;
                    ts.EndDate = jsn.hasOwnProperty("EndDate") ? new Date(jsn["EndDate"]) : null;
                    ts.ValueUnits = jsn.hasOwnProperty("ValueUnits") ? jsn["ValueUnits"] : null;
                    var obs = jsn.hasOwnProperty("Observations") ? jsn["Observations"] : null;
                    if (obs != null) {
                        ts.Observations = [];
                        obs.forEach(function (p) { return ts.Observations.push(TimeSeriesObservation.FromJSON(p)); });
                    }
                    return ts;
                };
                return TimeSeries;
            })();
            var TimeSeriesObservation = (function () {
                function TimeSeriesObservation(d, v, c) {
                    this.Date = d;
                    this.Value = v;
                    this.Code = c;
                }
                TimeSeriesObservation.FromJSON = function (jsn) {
                    var date = jsn.hasOwnProperty("Date") ? new Date(jsn["Date"]) : null;
                    var value = jsn.hasOwnProperty("Value") ? jsn["Value"] : -9999;
                    var dc = jsn.hasOwnProperty("DataCode") ? jsn["DataCode"] : null;
                    return new TimeSeriesObservation(date, value, dc);
                };
                return TimeSeriesObservation;
            })(); //end class
        })(TimeSeries = Models.TimeSeries || (Models.TimeSeries = {}));
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=TimeSeries.js.map
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        var Helpers;
        (function (Helpers) {
            var RequestInfo = (function () {
                function RequestInfo(ul, mthd, dtype, data) {
                    if (mthd === void 0) { mthd = 0 /* GET */; }
                    if (dtype === void 0) { dtype = "json"; }
                    if (data === void 0) { data = null; }
                    this.url = ul;
                    this.method = methodType[mthd];
                    this.dataType = dtype;
                    //Avoid setting custom header if you don't want to do a CORS preflight dance
                    //this.headers = {
                    //    'Content-Type': contentType
                    //}
                    this.data = data;
                }
                return RequestInfo;
            })();
            Helpers.RequestInfo = RequestInfo; //end class
            (function (methodType) {
                methodType[methodType["GET"] = 0] = "GET";
                methodType[methodType["POST"] = 1] = "POST";
                methodType[methodType["PUT"] = 2] = "PUT";
                methodType[methodType["DELETE"] = 3] = "DELETE";
            })(Helpers.methodType || (Helpers.methodType = {}));
            var methodType = Helpers.methodType;
        })(Helpers = Services.Helpers || (Services.Helpers = {}));
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {})); //end module
//# sourceMappingURL=RequestInfo.js.map