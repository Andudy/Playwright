import {expect, Locator, Page } from '@playwright/test';


export class FaceDetection {

    readonly page: Page;
    readonly noFaceLocator: Locator;
    readonly faceElementLocator: Locator;
    readonly uploadButtonLocator: Locator;

    constructor(page: Page)
    {
    this.page = page;
    this.noFaceLocator = page.locator('//div/p[text()[normalize-space()="No face detected"]]');
    this.faceElementLocator = page.locator('.Detection_image-wrapper__kwoI_');
    this.uploadButtonLocator = page.locator('//button[@data-test="button-upload-file"]');
    }

    async checkFaceDetectionResult() {
        var faceElementLocatorCount = await this.faceElementLocator.count();
        if (await this.noFaceLocator.isVisible()){
            console.log('No face detected')
        }
        else if (await this.faceElementLocator.first().isVisible()){
            if(faceElementLocatorCount==1){
                console.log('Only one face is Present');
            }
            else if(faceElementLocatorCount>1){
                console.log(`Number of faces detected: '${faceElementLocatorCount}'`);
            }
        }
    }
}