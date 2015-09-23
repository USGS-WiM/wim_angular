module WiM.Services.Helpers {
    export class RequestInfo implements ng.IRequestConfig {
        //Properties

        public method: string;
        public includesBaseURL: boolean;
        public url: string;
        public headers: any;
        public dataType: string
        public params: any;
        public data: any;
        public transformRequest:Function;

        constructor(ul: string, includesbaseurl:boolean = false, mthd: methodType = methodType.GET, dtype:string ="json", data: any = null, headers: any = null, tranform:Function = null ) {
            this.url = ul;
            this.includesBaseURL = includesbaseurl;
            this.method = methodType[mthd];
            this.dataType = dtype;
            this.transformRequest = tranform;
            this.headers = headers;

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