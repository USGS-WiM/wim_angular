var WiM;
(function (WiM) {
    var Event;
    (function (Event) {
        var Delegate = (function () {
            function Delegate() {
                this._eventHandlers = new Array();
            }
            Delegate.prototype.subscribe = function (eventHandler) {
                if (this._eventHandlers.indexOf(eventHandler) == -1) {
                    this._eventHandlers.push(eventHandler);
                }
            };
            Delegate.prototype.unsubscribe = function (eventHandler) {
                var i = this._eventHandlers.indexOf(eventHandler);
                if (i != -1) {
                    this._eventHandlers.splice(i, 1);
                }
            };
            Delegate.prototype.raise = function (sender, e) {
                for (var i = 0; i < this._eventHandlers.length; i++) {
                    this._eventHandlers[i].handle(sender, e);
                }
            };
            return Delegate;
        })();
        Event.Delegate = Delegate;
    })(Event = WiM.Event || (WiM.Event = {}));
})(WiM || (WiM = {}));
//# sourceMappingURL=Delegate.js.map