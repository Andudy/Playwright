import {expect, Locator, Page } from '@playwright/test';


export class FaceDetection {

    readonly page: Page;

    constructor(page: Page) {

    this.page = page;
    }

    async checkFaceDetectionResult() {
        const noFace = this.page.locator('//div/p[text()[normalize-space()="No face detected"]]');
        const faceElementLocator = this.page.locator('.Detection_image-wrapper__kwoI_');
        var faceElementLocatorCount = await faceElementLocator.count();
        if (await noFace.isVisible()){
            console.log('No face detected')
        }
        else if (await faceElementLocator.first().isVisible()){
            if(faceElementLocatorCount==1){
                console.log('Only one face is Present');
            }
            else if(faceElementLocatorCount>1){
                console.log(`Number of faces detected: '${faceElementLocatorCount}'`);
            }
        }
    }
}