/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const assert = require('assertthat'),
      puppeteer = require('puppeteer');

suite('Integration', async function () {
  this.timeout(20 * 1000);

  let browser,
      page;

  setup(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto('http://0.0.0.0:8080/');
  });

  teardown(async () => {
    await browser.close();
  });

  test('Observes lists <List /> and provides application via withWolkenkit.', async () => {
    await page.waitForSelector('.messages');
    const emptyMessages = await page.$$('.messages .message');

    assert.that(emptyMessages).is.equalTo([]);

    await page.type('#new-message', 'Hello wolkenkit-react!');
    await page.click('#send-message');

    await page.waitForSelector('.messages .message');
    const messages = await page.$$('.messages .message');
    const firstLabel = await page.$eval('.messages .message .label', node => node.innerText);

    assert.that(messages.length).is.equalTo(1);
    assert.that(firstLabel).is.equalTo('Hello wolkenkit-react!');
  });

  test('Observes lists <ListItems />.', async () => {
    await page.waitForSelector('.messages .message');

    await page.click('.messages .message .timestamp');
    await page.waitForSelector('.right-panel .message-detail-panel .message');

    const initialLikes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

    assert.that(initialLikes).is.equalTo('0');

    await page.click('.message-detail-panel .message .likes');

    await new Promise(resolve => setTimeout(resolve, 500));

    const likes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

    assert.that(likes).is.equalTo('1');
  });
});
