//------------------------------------------------------------------------------
//----- FDCTM ---------------------------------------------------------------
//------------------------------------------------------------------------------
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  Represents the FlowAnywhere model
//          
//discussion:
//
//Comments
//08.14.2014 jkn - Created
//Imports"
///<reference path="../Scenario.ts"/>
// Class
var StreamStats;
(function (StreamStats) {
    var Models;
    (function (Models) {
        var Scenario;
        (function (Scenario) {
            var Similar;
            (function (Similar) {
                var FlowAnywhere = (function (_super) {
                    __extends(FlowAnywhere, _super);
                    //Constructor
                    function FlowAnywhere(regionID, d, loadParameters) {
                        if (loadParameters === void 0) { loadParameters = true; }
                        _super.call(this, "FLA", ModelType.SIMILAR, d);
                        this.RegionID = regionID;
                        this.HasRegions(true);
                        this.SelectedRegion = null;
                        this.RegionList = [];
                        if (loadParameters) {
                            //this.SelectedRegion.subscribe(x=> this.GetParameters(configuration.appSettings['RegressionService'] + '/' + this.Model + '/def?state=' + this.RegionID + "&region=" + this.SelectedRegion()))
                            this.loadRegionList(configuration.appSettings['RegressionService'] + '/' + this.Model + '/def?state=' + this.RegionID);
                        }
                        //this.Equation = ko.pureComputed({
                        //    owner: this,
                        //    read: () => {
                        //        var eq: string = "\\[Q_u = " + this.Const1 + "{DA_u \\over DA_r}^{" + this.Const2 + "}Q_r^{" + this.Const3 + "}\\]";
                        //        return eq;
                        //    }
                        //});
                    } //end constructor
                    //Override Methods
                    FlowAnywhere.prototype.GetReferenceStation = function (pnt) {
                        var _this = this;
                        // loads the referance stations
                        var url = configuration.appSettings["FlowAnywhereRefGage"].format(pnt.ToEsriString(), pnt.wkid);
                        $.ajax({
                            type: "GET",
                            url: url,
                            processData: false,
                            dataType: "json",
                            success: function (s) { return _this.loadFlowAnywhereReferenceStationResults(s); },
                            error: function (e) { return _this.onError(e); },
                            complete: function (c) { return _this.onComplete(); }
                        });
                    };
                    FlowAnywhere.prototype.CanExecute = function () {
                        var superOK = false;
                        var regionOK = false;
                        try {
                            superOK = _super.prototype.CanExecute.call(this);
                            regionOK = this.SelectedRegion > 0;
                            if (!superOK && !regionOK)
                                throw new Error();
                            return true;
                        }
                        catch (e) {
                            //this.Notification(new Notification("Can not execute at this time. Check model parameters... ", NotificationType.WARNING));
                            return false;
                        }
                    };
                    FlowAnywhere.prototype.ToJson = function () {
                        return JSON.stringify(this.Replacer());
                    };
                    FlowAnywhere.FromJSON = function (obj) {
                        var regionID = obj.hasOwnProperty("StateCode") ? obj["StateCode"] : "---";
                        var descr = obj.hasOwnProperty("Description") ? obj["Description"] : "---";
                        var fla = new FlowAnywhere(regionID, descr, false);
                        fla.AreaRatio = obj.hasOwnProperty("AreaRato") ? obj["AreaRato"] : -999;
                        fla.Const1 = obj.hasOwnProperty("Const1") ? obj["Const1"] : -999;
                        fla.Const2 = obj.hasOwnProperty("Const2") ? obj["Const2"] : -999;
                        fla.Const3 = obj.hasOwnProperty("Const3") ? obj["Const3"] : -999;
                        fla.SelectedRegion = obj.hasOwnProperty("Region") ? obj["Region"] : -999;
                        if (obj.hasOwnProperty("StartDate"))
                            fla.StartDate(new Date(obj["StartDate"]));
                        if (obj.hasOwnProperty("EndDate"))
                            fla.EndDate(new Date(obj["EndDate"]));
                        if (obj.hasOwnProperty("Parameters"))
                            fla.LoadParameters(obj["Parameters"]);
                        fla.EstimatedFlow = obj.hasOwnProperty("EstimatedFlow") ? TimeSeries.FromJSON(obj["EstimatedFlow"]) : null;
                        fla.EstimatedStation = obj.hasOwnProperty("ReferanceGage") ? Models.Station.FromJSON(obj["ReferanceGage"]) : null;
                        return fla;
                    };
                    FlowAnywhere.prototype.LoadExecuteResults = function (jsn) {
                        _super.prototype.LoadExecuteResults.call(this, jsn);
                        //if (jsn.hasOwnProperty("ExceedanceProbabilities")) this.loadProbabilites(jsn["ExceedanceProbabilities"]);
                        //this.Notification(new Notification("Model finished...", null, null, ActionType.HIDE));
                        this.ReportReady(true);
                    };
                    //Helper Methods
                    FlowAnywhere.prototype.loadRegionList = function (URL) {
                        var _this = this;
                        //get parameters from service       
                        $.ajax({
                            type: "GET",
                            url: URL,
                            dataType: "json",
                            success: function (m) { return m["Regions"].forEach(function (r) { return _this.RegionList.push(r.Region); }); },
                            async: false
                        });
                    };
                    FlowAnywhere.prototype.loadFlowAnywhereReferenceStationResults = function (resp) {
                        if (!resp.hasOwnProperty("features"))
                            return;
                        var feat = resp["features"][0];
                        if (feat == null)
                            return;
                        var attr = feat.hasOwnProperty("attributes") ? feat["attributes"] : null;
                        if (attr == null)
                            return;
                        var sID = attr.hasOwnProperty("reference_gages.site_id") ? attr["reference_gages.site_id"] : null;
                        var sName = attr.hasOwnProperty("reference_gages.site_name") ? attr["reference_gages.site_name"] : null;
                        attr.hasOwnProperty("regions_local.Region_Agg") ? this.SelectedRegion(attr["regions_local.Region_Agg"]) : this.SelectedRegion(1);
                        //this.Notification(new Notification("Region " + this.SelectedRegion() + " selected as FlowAnywhere model region"));
                        if (sID == null)
                            return;
                        if (this.ReferenceGageList().length != 0)
                            this.ReferenceGageList.removeAll();
                        var RefGage = new Models.Station(sID);
                        RefGage.Name = sName;
                        this.ReferenceGageList.push(RefGage);
                        this.SelectedReferenceGage(this.ReferenceGageList()[0]);
                        //this.Notification(new Notification("Station " + this.SelectedReferenceGage().StationID + " selected as FlowAnywhere model reference gage"));
                    };
                    FlowAnywhere.prototype.Replacer = function () {
                        return {
                            "startdate": this.StartDate,
                            "enddate": this.EndDate,
                            "nwis_station_id": this.SelectedReferenceGage().StationID,
                            "region": this.SelectedRegion,
                            "parameters": this.Parameters
                        };
                    };
                    return FlowAnywhere;
                }(Scenario.Scenario));
            })(Similar = Scenario.Similar || (Scenario.Similar = {}));
        })(Scenario = Models.Scenario || (Models.Scenario = {}));
    })(Models = StreamStats.Models || (StreamStats.Models = {}));
})(StreamStats || (StreamStats = {}));
//# sourceMappingURL=FlowAnywhere.js.map