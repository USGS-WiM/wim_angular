module WiM.Event {
  export  class EventArgs {
        public static get Empty(): EventArgs {
            return new EventArgs();
        }
    }
}