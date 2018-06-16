export type getLeavesFn = (limit: number, offset: number) => GeoJSON.Feature<GeoJSON.Point>[];
export type getChildrenFn = () => GeoJSON.Feature<GeoJSON.Point>[];
export type getClusterExpansionZoomFn = (clusterId: number, clusterZoom: number) => number;
