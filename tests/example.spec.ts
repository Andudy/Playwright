import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('get started link', async ({ page }) => {
  await page.goto('https://faceapi.regulaforensics.com/');
  await page.click('//div[contains(text(),"Face detection")]')
  await page.waitForSelector('.UploadButton_button__HWiLP');
  await page.click('.UploadButton_button__HWiLP');
  await page.click('//button[contains(text(),"Confirm")]');
  // await page.setInputFiles(path.join(__dirname, 'myfile.pdf'));
  await page.pause()

  // Click the get started link.
  //await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
