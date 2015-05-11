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
        onSelectedAreaOfInterestChanged: WiM.Event.Delegate<WiM.Event.EventArgs>;
        selectedAreaOfInterest: ISearchAPIOutput;
        areaOfInterestList: Array<ISearchAPIOutput>;
        loadLocations(searchTerm: string): any;
    }
    interface ISearchConfig {
        LATmin: number;
        LATmax: number;
        LONmin: number;
        LONmax: number;
        includeGNIS: boolean;
        useCommonGnisClasses: boolean;
        includeUsgsSiteSW: boolean;
        includeUsgsSiteGW: boolean;
        includeUsgsSiteSP: boolean;
        includeUsgsSiteAT: boolean;
        includeUsgsSiteOT: boolean;
        includeZIPcodes: boolean;
        includeAREAcodes: boolean;
        includeState: boolean;
        topN: number;
        debug: boolean;
        term: string;
        state: string;
    }
}
