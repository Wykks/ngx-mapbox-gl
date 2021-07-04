import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const browserLogs = require('protractor-browser-logs');

describe('Popup', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  it('should show', async () => {
    await browser.get('/demo/popup');
    const canvas = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(canvas), 2000);

    const popup = element(by.className('maplibregl-popup'));
    await browser.wait(EC.presenceOf(popup), 1000);
    const popupClasses = popup
      .getAttribute('class')
      .then((c) => c.split(' ').filter((c) => c.length > 0));
    expect(popupClasses).toContain('custom-popup-class1');
    expect(popupClasses).toContain('custom-popup-class2');

    const popupContent = element(by.className('maplibregl-popup-content'));
    await browser.wait(EC.presenceOf(popupContent), 1000);
    expect(popupContent.element(by.tagName('div')).getText()).toBe(
      'Hello world !'
    );
  });
});
