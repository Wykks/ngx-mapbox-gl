import { Map } from 'mapbox-gl';

export function mockMapbox() {
  const MockedMap = jest.mocked(Map);
  const setMinZoom = jest.fn();
  const setMinPitch = jest.fn();
  const getLayer = jest.fn();
  const off = jest.fn();
  const hasImage = jest.fn();
  const mockMapInstance = {
    setMinZoom,
    setMinPitch,
    getLayer,
    off,
    hasImage,
  } as jest.MockedObject<Map>;
  const on = jest.fn((evt, cb) => {
    if (evt === 'load') {
      cb({
        target: mockMapInstance,
      });
    }
    return mockMapInstance;
  });
  mockMapInstance.on = on as any;
  MockedMap.mockReturnValue(mockMapInstance);
  return mockMapInstance;
}
