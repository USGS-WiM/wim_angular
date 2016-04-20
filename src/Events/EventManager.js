//------------------------------------------------------------------------------
//----- EventManager -----------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2016 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  The service agent is responsible for managing Event subscriptions.
//          
//discussion:
//
//https://docs.angularjs.org/api/ng/service/$http
//Comments
//01.28.2016 jkn - Created
//Import
var WiM;
(function (WiM) {
    var Event;
    (function (Event_1) {
        'use strict';
        var Event = (function () {
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function Event(delegate) {
                this._onChanged = delegate;
            }
            Object.defineProperty(Event.prototype, "onChanged", {
                get: function () {
                    return this._onChanged;
                },
                enumerable: true,
                configurable: true
            });
            return Event;
        }()); //end Event
        var EventManager = (function () {
            //Properties
            //-+-+-+-+-+-+-+-+-+-+-+-
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function EventManager() {
                this._eventList = {};
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            EventManager.prototype.AddEvent = function (EventName) {
                if (!this._eventList.hasOwnProperty(EventName))
                    this._eventList[EventName] = new Event(new Delegate());
            };
            EventManager.prototype.SubscribeToEvent = function (EventName, handler) {
                if (!this._eventList.hasOwnProperty(EventName)) {
                    this.AddEvent(EventName);
                }
                this._eventList[EventName].onChanged.subscribe(handler);
            };
            EventManager.prototype.RaiseEvent = function (EventName, sender, args) {
                if (sender === void 0) { sender = null; }
                if (args === void 0) { args = EventArgs.Empty; }
                if (!this._eventList.hasOwnProperty(EventName))
                    return;
                this._eventList[EventName].onChanged.raise(sender, args);
                //console.log("Event Raised " + EventName);
            };
            EventManager.prototype.UnSubscribeToEvent = function (EventName, handler) {
                if (!this._eventList.hasOwnProperty(EventName))
                    return;
                this._eventList[EventName].onChanged.unsubscribe(handler);
            };
            return EventManager;
        }()); //end class
        factory.$inject = [];
        function factory() {
            return new EventManager();
        }
        angular.module('WiM.Event', [])
            .factory('WiM.Event.EventManager', factory);
    })(Event = WiM.Event || (WiM.Event = {}));
})(WiM || (WiM = {})); //end module 
//# sourceMappingURL=EventManager.js.map