import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const browserLogs = require('protractor-browser-logs');

describe('Custom control', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  beforeEach(async () => {
    await browser.get('/demo/ngx-custom-control');
    const canvas = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(canvas), 2000);
  });

  it('should show', async () => {
    const button = element(by.className('custom-control'));
    await browser.wait(EC.presenceOf(button), 4000);
    expect(button.getText()).toBe('Hello');
  });

  it('should do something on click', async () => {
    const button = element(by.className('custom-control'));
    await browser.wait(EC.presenceOf(button), 4000);
    await button.click();
    await browser.wait(EC.alertIsPresent(), 2000);
    await browser.switchTo().alert().accept();
  });
});
