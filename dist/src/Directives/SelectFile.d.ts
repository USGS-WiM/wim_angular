interface ISelectFileAttributes extends ng.IAttributes {
    customOnChange: any;
}
declare class SelectFile implements ng.IDirective {
    static instance(): ng.IDirective;
    restrict: string;
    link(scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ISelectFileAttributes): void;
}
