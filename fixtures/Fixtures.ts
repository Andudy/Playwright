import { test as basetest } from '@playwright/test';
import { MainPage } from '../pages/mainPageRegular.ts';
import { FaceDetection } from '../pages/faceDetection.ts';
import { FaceCompare } from '../pages/faceCompare.ts';

type Fixtures = 
{
    mainPageRegular: MainPage;
    faceDetection: FaceDetection;
    faceCompare: FaceCompare
    
};

export const test = basetest.extend<Fixtures>({
    mainPageRegular: async ({ page }, use) => 
    {
        await use(new MainPage(page));
    },
    faceDetection: async ({ page }, use) => 
    {
        await use(new FaceDetection(page));
    },
    faceCompare: async ({ page }, use) => 
    {
        await use(new FaceCompare(page));
    }
});