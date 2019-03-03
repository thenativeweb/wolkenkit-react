/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const assert = require('assertthat'),
      puppeteer = require('puppeteer');

suite('integration', async function () {
  this.timeout(20 * 1000);

  let browser,
      consoleLogs = [],
      page;

  const setupBrowser = async function (url) {
    if (!url) {
      throw new Error('Url is missing.');
    }

    browser = await puppeteer.launch({
      headless: true
    });

    page = await browser.newPage();
    page.on('console', message => {
      if (message.type() === 'info' || message.type() === 'error') {
        return;
      }

      consoleLogs.push(message);
    });

    await page.goto(url);
  };

  const teardownBrowser = async function () {
    consoleLogs = [];

    await page.close();
    await browser.close();
  };

  suite('Classic components', () => {
    setup(async () => {
      await setupBrowser('http://localhost:8080');
    });

    teardown(async () => {
      await teardownBrowser();
    });

    suite('withWolkenkit', () => {
      test('provides the application as property.', async () => {
        await page.waitForSelector('.messages');

        assert.that(consoleLogs.length).is.equalTo(1);

        const text = await consoleLogs[0].text();
        const messageArguments = consoleLogs[0].args();
        const applicationHandle = messageArguments[1];
        const communicationHandle = await applicationHandle.getProperty('communication');
        const commnunication = await communicationHandle.jsonValue();

        assert.that(text.startsWith('Chat.componentDidMount')).is.true();
        assert.that(commnunication).is.equalTo({ message: {}});
      });
    });

    suite('<List />', () => {
      test('observes lists.', async () => {
        await page.waitForSelector('.messages');
        const emptyMessages = await page.$$('.messages .message');

        assert.that(emptyMessages).is.equalTo([]);

        await page.type('#new-message', 'Hello wolkenkit-react!');
        await page.click('#send-message');
        await page.waitForFunction('document.querySelectorAll(".messages .message").length === 1');

        const firstLabel = await page.$eval('.messages .message .label', node => node.innerText);

        assert.that(firstLabel).is.equalTo('Hello wolkenkit-react!');
      });
    });

    suite('<ListItem />', () => {
      test('observes a single item of a list.', async () => {
        await page.waitForSelector('.messages .message');

        await page.click('.messages .message .timestamp');
        await page.waitForSelector('.right-panel .message-detail-panel .message');

        const initialLikes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

        assert.that(initialLikes).is.equalTo('0');

        await page.click('.message-detail-panel .message .likes');
        await page.waitForFunction('document.querySelector(".message-detail-panel .message .likes .count").innerText === "1"');

        const likes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

        assert.that(likes).is.equalTo('1');
      });
    });
  });

  suite('Hooked components', () => {
    setup(async () => {
      await setupBrowser('http://localhost:8080/?use-hooks');
    });

    teardown(async () => {
      await teardownBrowser();
    });

    suite('useApplication', () => {
      test('provides the application as property.', async () => {
        await page.waitForSelector('.messages');

        assert.that(consoleLogs.length).is.equalTo(1);

        const text = await consoleLogs[0].text();
        const messageArguments = consoleLogs[0].args();
        const applicationHandle = messageArguments[1];
        const communicationHandle = await applicationHandle.getProperty('communication');
        const commnunication = await communicationHandle.jsonValue();

        assert.that(text.startsWith('ChatWithHooks.componentDidMount')).is.true();
        assert.that(commnunication).is.equalTo({ message: {}});
      });
    });

    suite('useList', () => {
      test('observes lists.', async () => {
        await page.waitForFunction('document.querySelectorAll(".messages .message").length === 1');
        const messages = await page.$$('.messages .message');

        assert.that(messages.length).is.equalTo(1);

        await page.type('#new-message', 'Hello hooks!');

        await page.click('#send-message');
        await page.waitForFunction('document.querySelectorAll(".messages .message").length === 2');

        const secondLabel = await page.$eval('.messages .message:nth-child(2) .label', node => node.innerText);

        assert.that(secondLabel).is.equalTo('Hello hooks!');
      });
    });

    suite('useListItem', () => {
      test('observes a single item of a list.', async () => {
        await page.waitForFunction('document.querySelectorAll(".messages .message").length === 2');

        await page.click('.messages .message:nth-child(2) .timestamp');
        await page.waitForSelector('.right-panel .message-detail-panel .message');

        const initialLikes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

        assert.that(initialLikes).is.equalTo('0');

        await page.click('.message-detail-panel .message .likes');
        await page.waitForFunction('document.querySelector(".message-detail-panel .message .likes .count").innerText === "1"');

        const likes = await page.$eval('.message-detail-panel .message .likes .count', node => node.innerText);

        assert.that(likes).is.equalTo('1');
      });
    });
  });
});
