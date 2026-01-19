import {expect, Locator, Page } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

export class MainPage {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    async openMainPage() 
    {
        await this.page.goto('https://faceapi.regulaforensics.com/');
        const loadingIndicator = '[data-active-tab="loading"]';
        await this.page.waitForSelector(loadingIndicator, {state: "hidden"});    }
    async switchToTab(tabName: string)
    {
        await this.page.locator(`//nav//div[text()[normalize-space()='${tabName}']]`).click();
        await this.page.waitForLoadState('load');        
    }

    async waitForLoadingState() {
       const loadingIndicator = '[data-active-tab="loading"]';
        await this.page.waitForSelector(loadingIndicator, {state: "hidden"});
    }

    async acceptConfirmationDialog(textOnDialogBox: string) 
	{
        
        this.page.once('dialog', async dialog => 
		{
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');
                    
            // Verify Dialog Message
            expect(dialog.message()).toContain(textOnDialogBox);
    
            //Click on OK Button
            await dialog.accept();
		});
    }
}