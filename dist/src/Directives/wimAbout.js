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
        var FreshdeskTicketData = (function () {
            function FreshdeskTicketData() {
            }
            return FreshdeskTicketData;
        })();
        var GitHubIssueData = (function () {
            function GitHubIssueData() {
            }
            return GitHubIssueData;
        })();
        var wimAboutController = (function (_super) {
            __extends(wimAboutController, _super);
            function wimAboutController($scope, $http) {
                _super.call(this, $http, '');
                $scope.vm = this;
                this.gitHubIssues = new GitHubIssueData();
                this.freshdeskTicketData = new FreshdeskTicketData();
                this.selectedAboutTabName = "about";
                this.selectedHelpTabName = "submitTicket";
                this.aboutSelected = false;
                this.helpSelected = false;
                this.displayMessage;
                this.isValid = false;
            }
            wimAboutController.prototype.uploadFile = function (event) {
                console.log("this did work");
                this.freshdeskTicketData.attachments = event.target.files;
            };
            wimAboutController.prototype.submitTicket = function (isValid) {
                var _this = this;
                var url = 'https://streamstats.freshdesk.com/helpdesk/tickets.json';
                var data = angular.toJson({ "helpdesk_ticket": this.freshdeskTicketData });
                console.log('ticket data', data);
                var headers = {
                    "Authorization": "Basic " + btoa('MpxLRniw8Kf9Eax4ZK9b' + ":" + 'X')
                };
                var request = new WiM.Services.Helpers.RequestInfo(url, true, WiM.Services.Helpers.methodType.POST, 'json', data, headers);
                this.Execute(request).then(function (response) {
                    console.log('Got a response: ', response);
                    alert("Your request has been submitted.  Your request will be addressed as soon as possible");
                    _this.freshdeskTicketData = new FreshdeskTicketData();
                }, function (error) {
                }).finally(function () {
                });
            };
            wimAboutController.prototype.toggleHelpSelected = function () {
                if (this.helpSelected)
                    this.helpSelected = false;
                else
                    this.helpSelected = true;
                console.log(this.helpSelected);
            };
            wimAboutController.prototype.toggleAboutSelected = function () {
                if (this.aboutSelected)
                    this.aboutSelected = false;
                else
                    this.aboutSelected = true;
                console.log(this.aboutSelected);
            };
            wimAboutController.prototype.selectAboutTab = function (tabname) {
                if (this.selectedAboutTabName == tabname)
                    return;
                this.selectedAboutTabName = tabname;
                console.log('selected tab: ' + tabname);
            };
            wimAboutController.prototype.selectHelpTab = function (tabname) {
                if (this.selectedHelpTabName == tabname)
                    return;
                this.selectedHelpTabName = tabname;
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