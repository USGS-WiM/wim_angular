//------------------------------------------------------------------------------
//----- WiM About --------------------------------------------------------------
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
//   purpose:  
//          
//discussion:
//  http://www.ng-newsletter.com/posts/directives.html
//      Restrict parameters
//          'A' - <span ng-sparkline></span>
//          'E' - <ng-sparkline > </ng-sparkline>
//          'C' - <span class="ng-sparkline" > </span>
//          'M' - <!--directive: ng - sparkline-- >
//Comments
//04.15.2015 jkn - Created
//Import
var WiM;
(function (WiM) {
    var Directives;
    (function (Directives) {
        'use string';
        var SupportTicketData = (function () {
            function SupportTicketData() {
            }
            return SupportTicketData;
        }());
        var GitHubIssueData = (function () {
            function GitHubIssueData() {
            }
            return GitHubIssueData;
        }());
        var wimAboutController = (function (_super) {
            __extends(wimAboutController, _super);
            function wimAboutController($scope, $http) {
                _super.call(this, $http, '');
                $scope.vm = this;
                this.gitHubIssues = new GitHubIssueData();
                this.SupportTicketData = new SupportTicketData();
                this.selectedAboutTabName = "about";
                this.selectedHelpTabName = "faq";
                this.aboutSelected = false;
                this.helpSelected = false;
                this.displayMessage;
                this.isValid = false;
            }
            //Methods  
            //-+-+-+-+-+-+-+-+-+-+-+-
            wimAboutController.prototype.uploadFile = function (event) {
                //console.log("this did work");
                this.SupportTicketData.attachments = event.target.files;
            };
            //public submitGitHubIssue(): void {
            //    var url = 'https://api.github.com/repos/USGS-WIM/StreamStats/issues';
            //    if (this.gitHubIssueData.type) {
            //        this.gitHubIssueData.labels.push(this.gitHubIssueData.type)
            //    }
            //    this.gitHubIssueData.body = 'First Name: ' + this.gitHubIssueData.firstName + '\nLast Name: ' + this.gitHubIssueData.lastName + '\nEmail: ' + this.gitHubIssueData.email + '\nDescription: ' + this.gitHubIssueData.description;
            //    var data = angular.toJson(this.gitHubIssueData);
            //    var headers = {
            //        'Authorization': 'token 6991db72b598a37339260c9f4ef28a6fe20a1c4b'
            //    };
            //    var request: WiM.Services.Helpers.RequestInfo = new WiM.Services.Helpers.RequestInfo(url,true,Services.Helpers.methodType.POST,'json',data, headers);
            //    this.Execute(request).then(
            //        (response: any) => {
            //            console.log('Got a response: ', response.statusText);
            //            //sm when complete
            //        },(error) => {
            //            //sm when error
            //        }).finally(() => {
            //            this.toggleAboutSelected();
            //    });
            //}
            wimAboutController.prototype.submitTicket = function (isValid) {
                //console.log("ticket form validity: ", isValid);
                var _this = this;
                //if (!isValid) return;
                var url = 'https://streamstatshelp.zendesk.com/api/v2/tickets.json ';
                var data = angular.toJson({ "ticket": this.SupportTicketData });
                var user = 'marsmith@usgs.gov';
                var token = 'bCkA8dLeVkzs5mTPamt1g7zv8EMKUCuTRpPkW7Ez';
                //console.log('ticket data',data);
                var headers = {
                    "Authorization": "Basic " + btoa(user + '/token:' + token)
                };
                var request = new WiM.Services.Helpers.RequestInfo(url, true, Services.Helpers.methodType.POST, 'json', data, headers);
                this.Execute(request).then(function (response) {
                    //console.log('Got a response: ', response);
                    alert("Your request has been submitted.  Your request will be addressed as soon as possible");
                    _this.SupportTicketData = new SupportTicketData();
                    //sm when complete
                }, function (error) {
                    //sm when error
                }).finally(function () {
                });
            };
            wimAboutController.prototype.toggleHelpSelected = function () {
                if (this.helpSelected)
                    this.helpSelected = false;
                else
                    this.helpSelected = true;
                //console.log(this.helpSelected);
            };
            wimAboutController.prototype.toggleAboutSelected = function () {
                if (this.aboutSelected)
                    this.aboutSelected = false;
                else
                    this.aboutSelected = true;
                //console.log(this.aboutSelected);
            };
            wimAboutController.prototype.selectAboutTab = function (tabname) {
                if (this.selectedAboutTabName == tabname)
                    return;
                this.selectedAboutTabName = tabname;
                //console.log('selected tab: '+tabname);
            };
            wimAboutController.prototype.selectHelpTab = function (tabname) {
                if (this.selectedHelpTabName == tabname)
                    return;
                this.selectedHelpTabName = tabname;
                //console.log('selected tab: ' + tabname);
            };
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            wimAboutController.$inject = ['$scope', '$http'];
            return wimAboutController;
        }(WiM.Services.HTTPServiceBase));
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
            //replace= true;
            wimAbout.prototype.link = function (scope, element, attributes, controller) {
                //this is where we can register listeners, set up watches, and add functionality. 
                // The result of this process is why the live data- binding exists between the scope and the DOM tree.
            }; //end link
            return wimAbout;
        }()); //end UrlDirective
        angular.module('wim_angular')
            .directive('wimAbout', wimAbout.instance);
    })(Directives = WiM.Directives || (WiM.Directives = {}));
})(WiM || (WiM = {})); //end module 
//# sourceMappingURL=wimAbout.js.map