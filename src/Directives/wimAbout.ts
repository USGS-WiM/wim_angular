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
        selected: boolean;
        selectedTabName: string;
        toggleSelected(): void;
        submitIssue(): void;
        selectTab(tabname: string): void;

    }
    interface IUrlAttributes extends ng.IAttributes {
        //must use camelcase
        mainUrl: string;
    }

    class wimAboutController extends WiM.Services.HTTPServiceBase implements IwimAboutController {
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public selected: boolean;
        public selectedTabName: string;
        public gitHubIssueData: any;
        
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope', '$http'];
        constructor($scope: IwimAboutControllerScope, $http: ng.IHttpService) {
            super($http, 'https://api.github.com/');
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
        
        //Methods  
        //-+-+-+-+-+-+-+-+-+-+-+-
        public submitIssue(): void {
            var url = 'repos/USGS-WIM/StreamStats/issues';

            if (this.gitHubIssueData.type) {
                this.gitHubIssueData.labels.push(this.gitHubIssueData.type)
            }
            this.gitHubIssueData.body = 'First Name: ' + this.gitHubIssueData.firstName + '\nLast Name: ' + this.gitHubIssueData.lastName + '\nEmail: ' + this.gitHubIssueData.email + '\nDescription: ' + this.gitHubIssueData.description;
            var data = JSON.stringify(this.gitHubIssueData);
            var headers = {
                'Authorization': 'token 6991db72b598a37339260c9f4ef28a6fe20a1c4b'
            };
            var request: WiM.Services.Helpers.RequestInfo = new WiM.Services.Helpers.RequestInfo(url,false,Services.Helpers.methodType.POST,'json',data, headers);

            this.Execute(request).then(
                (response: any) => {
                    console.log('Got a response: ', response.statusText);
                    //sm when complete
                },(error) => {
                    //sm when error
                }).finally(() => {
                    this.toggleSelected();
            });
        }

        public toggleSelected(): void {
            if (this.selected) this.selected = false;
            else this.selected = true;

            console.log(this.selected);
        }
        public selectTab(tabname:string): void {
            if (this.selectedTabName == tabname) return;
            this.selectedTabName = tabname;
            console.log('selected tab: '+tabname);
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