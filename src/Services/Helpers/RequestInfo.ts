module WiM.Services.Helpers {
    export class RequestInfo implements ng.IRequestConfig {
        //Properties

        public method: string;
        public includesBaseURL: boolean;
        public url: string;
        public timeout: any;
        public headers: any;
        public dataType: string
        public params: any;
        public data: any;
        public transformRequest:any; 

        constructor(ul: string, includesbaseurl: boolean = false, mthd: methodType = methodType.GET, dtype: string = "json", data: any = null, headers: any = null, tranform: any = null, timeout: Number = 300000) {
            this.url = ul;
            this.includesBaseURL = includesbaseurl;
            this.method = methodType[mthd];
            this.dataType = dtype;
            this.transformRequest = tranform;
            this.headers = headers;
            this.timeout = timeout;

            this.data = data;
        }
    }//end class
    export enum methodType{
        GET,
        POST,
        PUT,
        DELETE
    }
}//end module