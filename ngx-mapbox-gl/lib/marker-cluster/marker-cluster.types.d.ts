export declare type getLeavesFn = (limit: number, offset: number) => GeoJSON.Feature<GeoJSON.Point>[];
export declare type getChildrenFn = () => GeoJSON.Feature<GeoJSON.Point>[];
export declare type getClusterExpansionZoomFn = (clusterId: number, clusterZoom: number) => number;
