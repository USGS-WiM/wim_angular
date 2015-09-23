declare module WiM.Services.Helpers {
    class RequestInfo implements ng.IRequestConfig {
        method: string;
        includesBaseURL: boolean;
        url: string;
        headers: any;
        dataType: string;
        params: any;
        data: any;
        transformRequest: Function;
        constructor(ul: string, includesbaseurl?: boolean, mthd?: methodType, dtype?: string, data?: any, headers?: any, tranform?: Function);
    }
    enum methodType {
        GET = 0,
        POST = 1,
        PUT = 2,
        DELETE = 3,
    }
}
