import 'jest-preset-angular/setup-jest';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
}));
