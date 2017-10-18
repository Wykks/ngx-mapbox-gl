import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const browserLogs = require('protractor-browser-logs');

describe('Generic runtime error check', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  [
    'display-map',
    'custom-style-id',
    'satellite-map',
    'add-image-generated',
    'add-image',
    'cluster',
    'heatmap',
    'geojson-line',
    'ngx-geojson-line',
    'custom-marker-icons',
    'ngx-custom-marker-icons',
    'set-popup',
    'fullscreen',
    'navigation',
    'locate-user',
    'ngx-attribution',
    'ngx-scale-control',
    'interactive-false'
  ].forEach((route: string) => {
    it(`should display a map without errors for /${route}`, async () => {
      await browser.get(`/${route}`);
      const elm = element(by.tagName('canvas'));
      await browser.wait(EC.presenceOf(elm), 2000);
      await browser.sleep(1000);
    });
  });
});


