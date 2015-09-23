module WiM.Services.Helpers {
    export function paramsTransform(data:any): string{
        var str = [];
        for (var p in data)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
        return str.join("&");
    }//end paramsTransform
}//end module 