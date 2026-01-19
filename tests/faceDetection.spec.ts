import {expect, Page, FileChooser } from '@playwright/test';
import { test } from '../fixtures/Fixtures.ts';
import * as path from 'node:path';

const photoWithoutFace = path.resolve('../Playwright/uploadFiles/fish.jpg');
const photoWithOneFace = path.resolve('../Playwright/uploadFiles/TerminatorOneFace.jpg');
const picWithManyFacesToCompare = path.resolve('../Playwright/uploadFiles/friends1.jpg');
const picWithManyFacesToCompare2 = path.resolve('../Playwright/uploadFiles/friends2.jpg');

test('Face Compare check', async ({mainPageRegular,faceCompare}) => {
  await mainPageRegular.openMainPage();
  await mainPageRegular.switchToTab('Face matching');
  await mainPageRegular.page.reload();
  await mainPageRegular.switchToTab('Face matching');
  //Loading 1 file into Reference section and 2nd file to Compare section and checking Comparing results: if Similarity>90% than faces match
  await expect(faceCompare.referenceUploadButtton).toBeVisible();
  await faceCompare.referenceUploadButttonInput.setInputFiles(picWithManyFacesToCompare);
  await mainPageRegular.waitForLoadingState();
  await expect(faceCompare.compareUploadButton).toBeVisible();
  await faceCompare.compareUploadButtonInput.setInputFiles(picWithManyFacesToCompare2);
  await expect(faceCompare.listItems.first()).toBeVisible();
  await faceCompare.checkFaceCompare();
});

test('Face Detection check', async ({mainPageRegular,faceDetection}) => {
  await mainPageRegular.openMainPage();
  await mainPageRegular.switchToTab('Face detection');
  await mainPageRegular.page.reload();
  await mainPageRegular.switchToTab('Face detection');
  await expect(faceDetection.uploadButtonLocator).toBeVisible();
  //Loading photo without face
  await mainPageRegular.page.setInputFiles("input[type='file']", photoWithoutFace);
  //Confirming uploading files for the 1st time
  await mainPageRegular.acceptConfirmationDialog('To continue, confirm that you have read and accepted the Regula Data Privacy Policy.');
  await mainPageRegular.waitForLoadingState();
  await expect(mainPageRegular.page.getByText('No face detected')).toBeVisible();
  await faceDetection.checkFaceDetectionResult();
  await expect(faceDetection.uploadButtonLocator).toBeVisible();
  //Loading photo many faces
  await mainPageRegular.page.setInputFiles("input[type='file']", picWithManyFacesToCompare);
  await expect(faceDetection.faceElementLocator.first()).toBeVisible();
  await faceDetection.checkFaceDetectionResult();
  await expect(faceDetection.uploadButtonLocator).toBeVisible();
  //Loading photo with 1 face
  await mainPageRegular.page.setInputFiles("input[type='file']", photoWithOneFace);
  await expect(faceDetection.faceElementLocator.first()).toBeVisible();
  await faceDetection.checkFaceDetectionResult();
});
