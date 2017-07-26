declare module WiM.Directives {
    interface IwimLegendController {
        overlays: IwimLegendLayerGroup;
        baselayers: IwimLegendLayerGroup;
    }
    interface IwimLegendLayerGroup {
        selectedlayerName: string;
        isAvailable: boolean;
        layergroup: any;
        isOpen: boolean;
    }
    var onLayerAdded: string;
    var onLayerChanged: string;
    var onLayerRemoved: string;
    class LegendLayerAddedEventArgs extends WiM.Event.EventArgs {
        LayerName: string;
        layerType: String;
        visible: boolean;
        style: any;
        constructor(layername: string, ltype: string, style: any, visible?: boolean);
    }
    class LegendLayerChangedEventArgs extends WiM.Event.EventArgs {
        LayerName: string;
        PropertyName: String;
        Value: any;
        constructor(layername: string, propertyname: string, value: any);
    }
    class LegendLayerRemovedEventArgs extends WiM.Event.EventArgs {
        LayerName: string;
        layerType: String;
        constructor(layername: string, ltype: string);
    }
}
