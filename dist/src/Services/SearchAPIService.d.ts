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
    class SearchLocation implements ISearchAPIOutput {
        Name: string;
        Category: string;
        State: string;
        County: string;
        Longitude: number;
        Latitude: number;
        crs: string;
        Elevation: number;
        Id: string;
        Source: string;
        constructor(nm: string, ct: string, st: string, lat: number, long: number);
    }
}
