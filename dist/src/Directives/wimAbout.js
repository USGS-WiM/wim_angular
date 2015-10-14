var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WiM;
(function (WiM) {
    var Directives;
    (function (Directives) {
        'use string';
        var wimAboutController = (function (_super) {
            __extends(wimAboutController, _super);
            function wimAboutController($scope, $http) {
                _super.call(this, $http, 'https://api.github.com/');
                $scope.vm = this;
                this.selectedTabName = "about";
                this.selected = false;
                this.gitHubIssueData = {};
                this.gitHubIssueData.firstName = '';
                this.gitHubIssueData.lastName = '';
                this.gitHubIssueData.email = '';
                this.gitHubIssueData.description = '';
                this.gitHubIssueData.type = '';
                this.gitHubIssueData.labels = ['StreamStats'];
            }
            wimAboutController.prototype.submitIssue = function () {
                var _this = this;
                var url = 'repos/USGS-WIM/StreamStats/issues';
                if (this.gitHubIssueData.type) {
                    this.gitHubIssueData.labels.push(this.gitHubIssueData.type);
                }
                this.gitHubIssueData.body = 'First Name: ' + this.gitHubIssueData.firstName + '\nLast Name: ' + this.gitHubIssueData.lastName + '\nEmail: ' + this.gitHubIssueData.email + '\nDescription: ' + this.gitHubIssueData.description;
                var data = JSON.stringify(this.gitHubIssueData);
                var headers = {
                    'Authorization': 'token addd1701980216fcafb97eadc0ed808a21bac675'
                };
                var request = new WiM.Services.Helpers.RequestInfo(url, false, 1 /* POST */, 'json', data, headers);
                this.Execute(request).then(function (response) {
                    console.log('Got a response: ', response.statusText);
                }, function (error) {
                }).finally(function () {
                    _this.toggleSelected();
                });
            };
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
            wimAboutController.$inject = ['$scope', '$http'];
            return wimAboutController;
        })(WiM.Services.HTTPServiceBase);
        var wimAbout = (function () {
            function wimAbout() {
                this.scope = true;
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