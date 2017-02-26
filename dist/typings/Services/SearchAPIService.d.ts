declare module WiM.Services {
    var onSelectedAreaOfInterestChanged: string;
    interface ISearchAPIOutput {
        properties: Object;
        geometry: Object;
        type: string;
    }
    interface ISearchAPIService {
    }
    class SearchAPIEventArgs extends WiM.Event.EventArgs {
        selectedAreaOfInterest: ISearchAPIOutput;
        constructor(aoi: ISearchAPIOutput);
    }
}
