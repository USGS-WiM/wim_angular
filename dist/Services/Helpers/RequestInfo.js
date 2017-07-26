var WiM;
(function (WiM) {
    var Services;
    (function (Services) {
        var Helpers;
        (function (Helpers) {
            var RequestInfo = (function () {
                function RequestInfo(ul, includesbaseurl, mthd, dtype, data, headers, tranform, timeout) {
                    if (includesbaseurl === void 0) { includesbaseurl = false; }
                    if (mthd === void 0) { mthd = methodType.GET; }
                    if (dtype === void 0) { dtype = "json"; }
                    if (data === void 0) { data = null; }
                    if (headers === void 0) { headers = null; }
                    if (tranform === void 0) { tranform = null; }
                    if (timeout === void 0) { timeout = 300000; }
                    this.url = ul;
                    this.includesBaseURL = includesbaseurl;
                    this.method = methodType[mthd];
                    this.dataType = dtype;
                    this.transformRequest = tranform;
                    this.headers = headers;
                    this.timeout = timeout;
                    this.data = data;
                }
                return RequestInfo;
            }());
            Helpers.RequestInfo = RequestInfo;
            var methodType;
            (function (methodType) {
                methodType[methodType["GET"] = 0] = "GET";
                methodType[methodType["POST"] = 1] = "POST";
                methodType[methodType["PUT"] = 2] = "PUT";
                methodType[methodType["DELETE"] = 3] = "DELETE";
            })(methodType = Helpers.methodType || (Helpers.methodType = {}));
        })(Helpers = Services.Helpers || (Services.Helpers = {}));
    })(Services = WiM.Services || (WiM.Services = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=RequestInfo.js.map