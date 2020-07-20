import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const PixelDiff = require('pixel-diff');
const browserLogs = require('protractor-browser-logs');

describe('Language switch', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  it('should change language', async () => {
    await browser.get('/demo/language-switch');
    const elm = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(elm), 2000);
    const buttons = element.all(by.className('lang-button'));
    await browser.sleep(4000);
    await buttons.get(0).click();
    await browser.sleep(2000);
    const screen1 = await browser.takeScreenshot();
    await buttons.get(1).click();
    await browser.sleep(2000);
    const screen2 = await browser.takeScreenshot();
    const result = new PixelDiff({
      imageA: Buffer.from(screen1, 'base64'),
      imageB: Buffer.from(screen2, 'base64'),
    }).runSync();
    expect(result.differences).toBeGreaterThan(0);
    await buttons.get(0).click();
    await browser.sleep(2000);
    const screen1bis = await browser.takeScreenshot();
    const result2 = new PixelDiff({
      imageA: Buffer.from(screen1, 'base64'),
      imageB: Buffer.from(screen1bis, 'base64'),
    }).runSync();
    expect(result2.differences).toBe(0);
  });
});
