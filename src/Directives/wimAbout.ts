//------------------------------------------------------------------------------
//----- WiM About --------------------------------------------------------------
//------------------------------------------------------------------------------

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
module WiM.Directives{
    'use string';
    interface IwimAboutControllerScope extends ng.IScope {
        vm: IwimAboutController;
    }
    interface IwimAboutController {
        aboutSelected: boolean;
        helpSelected: boolean;
        selectedAboutTabName: string;
        selectedHelpTabName: string;
        toggleAboutSelected(): void;
       // submitGitHubIssue(): void;
        selectAboutTab(tabname: string): void;
        selectHelpTab(tabname: string): void;

    }
    interface IUrlAttributes extends ng.IAttributes {
        //must use camelcase
        mainUrl: string;
        file: any;
    }

    class FreshdeskTicketData {
        public firstName: string;
        public lastName: string;
        public email: string;
        public description: string;
        public subject: string;
        public attachments: any;
    }

    class GitHubIssueData {
        public firstName: string;
        public lastName: string;
        public email: string;
        public description: string;
        public type: string;
        public labels: Array<string>;
    }

    class wimAboutController extends WiM.Services.HTTPServiceBase implements IwimAboutController {
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public aboutSelected: boolean;
        public helpSelected: boolean;
        public selectedAboutTabName: string;
        public selectedHelpTabName: string;
        public gitHubIssues: GitHubIssueData;
        public freshdeskTicketData: FreshdeskTicketData;
        public displayMessage: string;
        public isValid: boolean;
        
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope', '$http'];
        constructor($scope: IwimAboutControllerScope, $http: ng.IHttpService) {
            super($http, '');
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
        
        //Methods  
        //-+-+-+-+-+-+-+-+-+-+-+-
        public uploadFile(event: any): void {
            console.log("this did work");
            this.freshdeskTicketData.attachments = event.target.files;
        }

        //public submitGitHubIssue(): void {
        //    var url = 'https://api.github.com/repos/USGS-WIM/StreamStats/issues';

        //    if (this.gitHubIssueData.type) {
        //        this.gitHubIssueData.labels.push(this.gitHubIssueData.type)
        //    }
        //    this.gitHubIssueData.body = 'First Name: ' + this.gitHubIssueData.firstName + '\nLast Name: ' + this.gitHubIssueData.lastName + '\nEmail: ' + this.gitHubIssueData.email + '\nDescription: ' + this.gitHubIssueData.description;
        //    var data = JSON.stringify(this.gitHubIssueData);
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

        public submitTicket(isValid: boolean): void {

            //console.log("ticket form validity: ", isValid);

            //if (!isValid) return;
            var url = 'https://streamstats.freshdesk.com/helpdesk/tickets.json';
            var data = JSON.stringify({ "helpdesk_ticket": this.freshdeskTicketData });

            console.log('ticket data',data);
            var headers = {
                "Authorization": "Basic " + btoa('MpxLRniw8Kf9Eax4ZK9b' + ":" + 'X')
            };
            var request: WiM.Services.Helpers.RequestInfo = new WiM.Services.Helpers.RequestInfo(url, true, Services.Helpers.methodType.POST, 'json', data, headers);

            this.Execute(request).then(
                (response: any) => {
                    console.log('Got a response: ', response);
                    alert("Your request has been submitted.  Your request will be addressed as soon as possible");
                    this.freshdeskTicketData = new FreshdeskTicketData();
                    //sm when complete
                },(error) => {
                    //sm when error
                }).finally(() => {

                    
            });
        }

        public toggleHelpSelected(): void {
            if (this.helpSelected) this.helpSelected = false;
            else this.helpSelected = true;

            console.log(this.helpSelected);
        }

        public toggleAboutSelected(): void {
            if (this.aboutSelected) this.aboutSelected = false;
            else this.aboutSelected = true;

            console.log(this.aboutSelected);
        }
        public selectAboutTab(tabname:string): void {
            if (this.selectedAboutTabName == tabname) return;
            this.selectedAboutTabName = tabname;
            console.log('selected tab: '+tabname);
        }
        public selectHelpTab(tabname: string): void {
            if (this.selectedHelpTabName == tabname) return;
            this.selectedHelpTabName = tabname;
            console.log('selected tab: ' + tabname);
        }
    }
   
    class wimAbout implements ng.IDirective {
        static instance(): ng.IDirective {
            return new wimAbout;
        }
        scope = true;
        restrict = 'E';
        controller = wimAboutController;
        templateUrl = 'Views/about/about.html';
        //replace= true;

        link(scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: IUrlAttributes, controller: IwimAboutController): void {
            //this is where we can register listeners, set up watches, and add functionality. 
            // The result of this process is why the live data- binding exists between the scope and the DOM tree.
           
        }//end link
    }//end UrlDirective

    angular.module('wim_angular',[])
        .directive('wimAbout', wimAbout.instance);
}//end module 