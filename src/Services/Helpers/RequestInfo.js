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
