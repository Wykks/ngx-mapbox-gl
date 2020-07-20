import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const PixelDiff = require('pixel-diff');
const browserLogs = require('protractor-browser-logs');

describe('Set style', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  xit('should change the style', async () => {
    await browser.get('/demo/set-style');
    const elm = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(elm), 2000);
    const radios = element.all(by.tagName('mat-radio-button'));
    await browser.sleep(7000);
    const style1 = await browser.takeScreenshot();
    await radios.get(1).click();
    await browser.sleep(3000);
    const style2 = await browser.takeScreenshot();
    const result = new PixelDiff({
      imageA: Buffer.from(style1, 'base64'),
      imageB: Buffer.from(style2, 'base64'),
    }).runSync();
    expect(result.differences).toBeGreaterThan(0);
    await radios.get(0).click();
    await browser.sleep(4000);
    const style1bis = await browser.takeScreenshot();
    const result2 = new PixelDiff({
      imageA: Buffer.from(style1, 'base64'),
      imageB: Buffer.from(style1bis, 'base64'),
    }).runSync();
    expect(result2.differences).toBe(0);
  });
});
