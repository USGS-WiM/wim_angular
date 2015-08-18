var WiM;
(function (WiM) {
    var Directives;
    (function (Directives) {
        'use string';
        var wimAboutController = (function () {
            function wimAboutController($scope) {
                $scope.vm = this;
                this.selectedTabName = "about";
                this.selected = false;
            }
            wimAboutController.prototype.toggleSelected = function () {
                if (this.selected)
                    this.selected = false;
                else
                    this.selected = true;
                console.log(this.selected);
            };
            wimAboutController.prototype.selectTab = function (tabname) {
                if (this.selectedTabName == tabname)
                    return;
                this.selectedTabName = tabname;
                console.log('selected tab: ' + tabname);
            };
            wimAboutController.$inject = ['$scope'];
            return wimAboutController;
        })();
        var wimAbout = (function () {
            function wimAbout() {
                this.restrict = 'E';
                this.controller = wimAboutController;
                this.templateUrl = 'Views/about/about.html';
            }
            wimAbout.instance = function () {
                return new wimAbout;
            };
            wimAbout.prototype.link = function (scope, element, attributes, controller) {
            };
            return wimAbout;
        })();
        angular.module('wim_angular', []).directive('wimAbout', wimAbout.instance);
    })(Directives = WiM.Directives || (WiM.Directives = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=wimAbout.js.map
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
//# sourceMappingURL=String.js.map
var WiM;
(function (WiM) {
    var Event;
    (function (Event) {
        var Delegate = (function () {
            function Delegate() {
                this._eventHandlers = new Array();
            }
            Delegate.prototype.subscribe = function (eventHandler) {
                if (this._eventHandlers.indexOf(eventHandler) == -1) {
                    this._eventHandlers.push(eventHandler);
                }
            };
            Delegate.prototype.unsubscribe = function (eventHandler) {
                var i = this._eventHandlers.indexOf(eventHandler);
                if (i != -1) {
                    this._eventHandlers.splice(i, 1);
                }
            };
            Delegate.prototype.raise = function (sender, e) {
                for (var i = 0; i < this._eventHandlers.length; i++) {
                    this._eventHandlers[i].handle(sender, e);
                }
            };
            return Delegate;
        })();
        Event.Delegate = Delegate;
    })(Event = WiM.Event || (WiM.Event = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=Delegate.js.map
var WiM;
(function (WiM) {
    var Event;
    (function (Event) {
        var EventArgs = (function () {
            function EventArgs() {
            }
            Object.defineProperty(EventArgs, "Empty", {
                get: function () {
                    return new EventArgs();
                },
                enumerable: true,
                configurable: true
            });
            return EventArgs;
        })();
        Event.EventArgs = EventArgs;
    })(Event = WiM.Event || (WiM.Event = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=EventArgs.js.map
var WiM;
(function (WiM) {
    var Event;
    (function (Event) {
        var EventHandler = (function () {
            function EventHandler(handler) {
                this._handler = handler;
            }
            EventHandler.prototype.handle = function (sender, e) {
                this._handler(sender, e);
            };
            return EventHandler;
        })();
        Event.EventHandler = EventHandler;
    })(Event = WiM.Event || (WiM.Event = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=EventHandler.js.map
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var Citation = (function () {
            function Citation(title, author, imageSrc, url) {
                this.Title = title;
                this.Author = author;
                this.imgSrc = imageSrc;
                this.src = url;
            }
            Citation.FromJSON = function (obj) {
                var Title = obj.hasOwnProperty("title") ? obj["title"] : "--";
                var Author = obj.hasOwnProperty("author") ? obj["author"] : "";
                var imgSrc = obj.hasOwnProperty("imgeSrc") ? obj["imgeSrc"] : "";
                var src = obj.hasOwnProperty("src") ? obj["src"] : "";
                return new Citation(Title, Author, imgSrc, src);
            };
            return Citation;
        })();
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=Citation.js.map
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var KeyValue = (function () {
            function KeyValue(k, v) {
                this.k = k;
                this.v = v;
                this.Key = k;
                this.Value = v;
            }
            return KeyValue;
        })();
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=KeyValue.js.map
var WiM;
(function (WiM) {
    var Models;
    (function (Models) {
        var Parameter = (function () {
            function Parameter(n, v, c, d, u, limit) {
                this.name = n;
                this.value = v;
                this.code = c;
                this.unit = u;
                this.description = d;
                this.limits = limit;
            }
            Parameter.FromJSON = function (obj) {
                var name = obj.hasOwnProperty("name") ? obj["name"] : "---";
                var descr = obj.hasOwnProperty("description") ? obj["description"] : "---";
                var code = obj.hasOwnProperty("code") ? obj["code"] : "---";
                var unit = obj.hasOwnProperty("unit") ? obj["unit"] : "---";
                var value = obj.hasOwnProperty("value") ? obj["value"] : -999;
                var limit = obj.hasOwnProperty("limits") && obj["limits"] != null ? Limit.FromJSON(obj["limits"]) : null;
                return new Parameter(name, value, code, descr, unit, limit);
            };
            return Parameter;
        })();
        var Limit = (function () {
            function Limit(min, max) {
                this.min = min;
                this.max = max;
            }
            Limit.FromJSON = function (obj) {
                var min = obj.hasOwnProperty("min") ? obj["min"] : -999;
                var max = obj.hasOwnProperty("max") ? obj["max"] : -999;
                return new Limit(min, max);
            };
            return Limit;
        })();
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=Parameter.js.map
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
        Models.Point = Point;
    })(Models = WiM.Models || (WiM.Models = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=Point.js.map
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
            function AuthenticationServiceAgent($http, $q, baseURL, u) {
                _super.call(this, $http, baseURL);
                this.User = u;
            }
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
                this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                return this.Execute(request).then(function (response) {
                });
            };
            AuthenticationServiceAgent.prototype.SetTokenAuthentication = function (uri, password) {
                var _this = this;
                try {
                    var request = new Services.Helpers.RequestInfo(uri);
                    return this.Execute(request).then(function (response) {
                        _this.$http.defaults.headers.common['Authorization'] = 'token ' + response.data;
                    });
                }
                catch (e) {
                }
            };
            AuthenticationServiceAgent.prototype.encode = function (input) {
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
        Services.AuthenticationServiceAgent = AuthenticationServiceAgent;
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=AuthenticationServiceBase.js.map
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        'use strict';
        var HTTPServiceBase = (function () {
            function HTTPServiceBase(http, baseURL) {
                this.baseURL = baseURL;
                this.$http = http;
            }
            HTTPServiceBase.prototype.Execute = function (request) {
                request.url = request.includesBaseURL ? request.url : this.baseURL + request.url;
                return this.$http(request);
            };
            return HTTPServiceBase;
        })();
        Services.HTTPServiceBase = HTTPServiceBase;
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=HTTPServiceBase.js.map
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
        var SearchAPIEventArgs = (function (_super) {
            __extends(SearchAPIEventArgs, _super);
            function SearchAPIEventArgs(aoi) {
                _super.call(this);
                this.selectedAreaOfInterest = aoi;
            }
            return SearchAPIEventArgs;
        })(WiM.Event.EventArgs);
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
        })(Services.HTTPServiceBase);
        factory.$inject = ['$http', '$q'];
        function factory($http, $q) {
            return new SearchAPIService($http, $q);
        }
        angular.module('WiM.Services').factory('WiM.Services.SearchAPIService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
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
        })();
        factory.$inject = ['$rootScope'];
        function factory($rootScope) {
            return new StateWatcherService($rootScope);
        }
        angular.module('WiM.Services').factory('WiM.Services.StateWatcherService', factory);
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=StateWatcherService.js.map
var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        var Helpers;
        (function (Helpers) {
            var RequestInfo = (function () {
                function RequestInfo(ul, includesbaseurl, mthd, dtype, data) {
                    if (includesbaseurl === void 0) { includesbaseurl = false; }
                    if (mthd === void 0) { mthd = 0 /* GET */; }
                    if (dtype === void 0) { dtype = "json"; }
                    if (data === void 0) { data = null; }
                    this.url = ul;
                    this.includesBaseURL = includesbaseurl;
                    this.method = methodType[mthd];
                    this.dataType = dtype;
                    this.data = data;
                }
                return RequestInfo;
            })();
            Helpers.RequestInfo = RequestInfo;
            (function (methodType) {
                methodType[methodType["GET"] = 0] = "GET";
                methodType[methodType["POST"] = 1] = "POST";
                methodType[methodType["PUT"] = 2] = "PUT";
                methodType[methodType["DELETE"] = 3] = "DELETE";
            })(Helpers.methodType || (Helpers.methodType = {}));
            var methodType = Helpers.methodType;
        })(Helpers = Services.Helpers || (Services.Helpers = {}));
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=RequestInfo.js.map