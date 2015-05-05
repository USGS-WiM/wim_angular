declare module WiM.Services {
    interface ISearchAPIOutput extends Models.IPoint {
        Name: string;
        Category: string;
        State: string;
        County: string;
        Elevation: number;
        Id: string;
        Source: string;
    }
    interface ISearchAPIService {
        getLocations(searchTerm: string): ng.IPromise<Array<ISearchAPIOutput>>;
    }
}
