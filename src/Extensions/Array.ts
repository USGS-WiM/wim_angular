interface Array<T> {
    group<T>(groupByProperty: string): { [id: string]: Array<T>; };
}

if (!Array.prototype.group) {
    Array.prototype.group = function () {
        var propName = arguments[0];
        var groupings: { [id: string]: any; } = {};
        this.forEach(function (item) {            
            var itemVal = item[propName].toString();
            if (!groupings.hasOwnProperty(itemVal)) {
                groupings[itemVal] = [item];
            }
            else {
                groupings[itemVal].push(item);
            }          
        });
        return groupings;  
    };
}