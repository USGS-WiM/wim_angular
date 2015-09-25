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