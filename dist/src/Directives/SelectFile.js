var SelectFile = (function () {
    function SelectFile() {
        this.restrict = 'A';
    }
    SelectFile.instance = function () {
        return new SelectFile;
    };
    SelectFile.prototype.link = function (scope, element, attributes) {
        var onChangeHandler = scope.$eval(attributes.customOnChange);
        element.bind('change', onChangeHandler);
    };
    return SelectFile;
})();
angular.module('wim_angular').directive('SelectFile', SelectFile.instance);
//# sourceMappingURL=SelectFile.js.map