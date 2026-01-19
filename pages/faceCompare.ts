import {expect, Locator, Page } from '@playwright/test';

export class FaceCompare {

    readonly page: Page;

    constructor(page: Page) {

    this.page = page;

    // const noFace = page.locator('No face detected');

    }

    async checkFaceCompare() {
        const listItems = this.page.locator("//div[contains(@class, 'Results_item__T4Lrp')]//b");
        // Get all text contents into an array
        const actualTexts = await listItems.allInnerTexts();
        let matchesCount = 0;
        await expect (this.page.locator("//div[contains(@class, 'Results_results__YRqqW')]")).toBeVisible();
        await expect (this.page.locator("//div[contains(@class, 'Results_item__T4Lrp')]//b").first()).toBeVisible();
        for(let i = 0; i<actualTexts.length;i++)
        {
            await expect (this.page.locator("//div[contains(@class, 'Results_item__T4Lrp')]//b").nth(i)).toBeVisible({timeout:3000});
            let matchingNumber = Number(actualTexts[i].replace(/\D/g, ""))
            if(matchingNumber>90)
                matchesCount ++;
            console.log(`matches this time '${matchesCount}'`);
        }
        console.log(`Number of faces matching: '${matchesCount}'`);
    }


}