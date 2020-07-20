import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const PixelDiff = require('pixel-diff');
const browserLogs = require('protractor-browser-logs');

describe('Zoomto Linestring', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  it('should zoom to linestring', async () => {
    await browser.get('/demo/zoomto-linestring');
    const elm = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(elm), 2000);
    const buttons = element.all(by.className('zoom-button'));
    await browser.sleep(4000);
    const screen1 = await browser.takeScreenshot();
    await buttons.get(0).click();
    await browser.sleep(4000);
    const screen2 = await browser.takeScreenshot();
    const result = new PixelDiff({
      imageA: Buffer.from(screen1, 'base64'),
      imageB: Buffer.from(screen2, 'base64'),
    }).runSync();
    expect(result.differences).toBeGreaterThan(0);
  });
});
