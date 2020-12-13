export function deprecationWarning(
  context: string,
  oldApi: string,
  newApi: string
) {
  console.warn(
    `[ngx-mapbox-gl]: ${context}: ${oldApi} is deprecated, please use ${newApi} instead.`
  );
}
