interface ISelectFileAttributes extends ng.IAttributes {
    //must use camelcase
    customOnChange: any;
}
class SelectFile implements ng.IDirective {
    static instance(): ng.IDirective {
        return new SelectFile;
    }
    restrict = 'A';
    //replace= true;

    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ISelectFileAttributes): void {
        //this is where we can register listeners, set up watches, and add functionality. 
        // The result of this process is why the live data- binding exists between the scope and the DOM tree.
        var onChangeHandler = scope.$eval(attributes.customOnChange);
        element.bind('change', onChangeHandler);
           
    }//end link
}//end UrlDirective

angular.module('wim_angular')
    .directive('SelectFile', SelectFile.instance);