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

module WiM.Event {
    'use strict'
    interface EventDictionary {
        [name: string]: IEvent;
    }
    interface IEvent {
        onChanged:Delegate<EventArgs>;
    }
    export interface IEventManager {
        AddEvent<T extends EventArgs>(EventName: string);
        SubscribeToEvent<T extends EventArgs>(EventName: string, handler: EventHandler<T>);
        RaiseEvent<T extends EventArgs>(EventName: string, sender: any, args: T);
        UnSubscribeToEvent<T extends EventArgs>(EventName: string, handler: EventHandler<T>);
    }

    class Event implements IEvent {
        private _onChanged: Delegate<WiM.Event.EventArgs>;
        public get onChanged(): Delegate<WiM.Event.EventArgs> {
            return this._onChanged;
        }
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor(delegate: Delegate<EventArgs>) {
            this._onChanged = delegate;
        }    

    }//end Event
  
    class EventManager implements IEventManager {
        //Event dictionary
        private _eventList: EventDictionary;
       
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor() {
            this._eventList = {};
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public AddEvent<T extends EventArgs>(EventName: string) {
            if (!this._eventList.hasOwnProperty(EventName))
            this._eventList[EventName] = new Event(new Delegate<T>());            
        }
        public SubscribeToEvent<T extends EventArgs>(EventName: string, handler: EventHandler<T>) {
            if (!this._eventList.hasOwnProperty(EventName)) {
                this.AddEvent<T>(EventName);
            }

            this._eventList[EventName].onChanged.subscribe(handler);
        }
        public RaiseEvent(EventName: string, sender:any = null, args: EventArgs = EventArgs.Empty) {
            if (!this._eventList.hasOwnProperty(EventName)) return;
            this._eventList[EventName].onChanged.raise(sender, args);
            //console.log("Event Raised " + EventName);
        }
        public UnSubscribeToEvent<T extends EventArgs>(EventName: string, handler: EventHandler<T>) {
            if (!this._eventList.hasOwnProperty(EventName)) return;

            this._eventList[EventName].onChanged.unsubscribe(handler);
        }        
        //HelperMethods
        //-+-+-+-+-+-+-+-+-+-+-+-
       

    }//end class

    factory.$inject = [];
    function factory() {
        return new EventManager()
    }
    angular.module('WiM.Event',[])
        .factory('WiM.Event.EventManager', factory)
}//end module 