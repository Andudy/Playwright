import {expect, Locator, Page } from '@playwright/test';

export class FaceCompare {

    readonly page: Page;
    readonly referenceUploadButtton: Locator;
    readonly referenceUploadButttonInput: Locator;
    readonly compareUploadButton: Locator;
    readonly compareUploadButtonInput: Locator;
    readonly listItems: Locator;
    constructor(page: Page) {

    this.page = page;
    this.referenceUploadButtton = page.locator("//div[text()[normalize-space()='Reference']]//..//..//..//div[contains(@class,'UploadFile_wrapper__ivZ2q')]");
    this.referenceUploadButttonInput = page.locator("//div[text()[normalize-space()='Reference']]//..//..//..//div[contains(@class,'UploadFile_wrapper__ivZ2q')]//input");
    this.compareUploadButton = page.locator("//div[text()[normalize-space()='Compare']]//..//..//..//div[contains(@class,'UploadFile_wrapper__ivZ2q')]");
    this.compareUploadButtonInput = page.locator("//div[text()[normalize-space()='Compare']]//..//..//..//div[contains(@class,'UploadFile_wrapper__ivZ2q')]//input");
    this.listItems = page.locator("//div[contains(@class, 'Results_item__T4Lrp')]//b");

    }

    async checkFaceCompare() {
        await expect (this.listItems.first()).toBeVisible();
        const actualTexts = await this.listItems.allInnerTexts();
        let matchesCount = 0;
        for(let i = 0; i<actualTexts.length;i++)
        {
            await expect (this.listItems.nth(i)).toBeVisible({timeout:5000});
            let matchingNumber = Number(actualTexts[i].replace(/\D/g, ""))
            if(matchingNumber>90)
                matchesCount ++;
            console.log(matchesCount);
        }
        console.log(`Number of faces matching: '${matchesCount}'`);
    }
}