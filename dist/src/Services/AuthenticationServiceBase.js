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
                return this.Execute(request)
                    .then(function (response) {
                });
            };
            AuthenticationServiceAgent.prototype.SetTokenAuthentication = function (uri, password) {
                var _this = this;
                try {
                    var request = new Services.Helpers.RequestInfo(uri);
                    return this.Execute(request)
                        .then(function (response) {
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
                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
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