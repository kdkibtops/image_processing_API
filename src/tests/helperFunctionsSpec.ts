import helperFunctions from '../helperFunctions';
import express from 'express';

const checkFileFunc = helperFunctions.checkFileFunc;
const throwErrorMsg = helperFunctions.throwErrorMsg;
const processImage = helperFunctions.processImage;
let res: express.Response;

describe('Checks helper functions for the project', () => {
  describe('tests checkFileFunc to return a boolean', () => {
    it('evaluates to true because file is available', async () => {
      const response = await checkFileFunc('fjord.jpg', 'images/');
      expect(response).toEqual(true);
    });
    it('evaluates to false because this file is missing', async () => {
      const response = await checkFileFunc('missing.jpg', 'images/');
      expect(response).toBeFalsy;
    });
  });
  describe('tests throwErrorMsg function to return an informing string', () => {
    it('returns a string to be passed for the res.send when there is any error im user imput', async () => {
      const response = await throwErrorMsg(
        'resizeImg?filename=fjord.jpg&width=ds&height=300',
        'filename=',
        'fjord.jpg'
      );
      expect(response).toEqual(
        '<B>' +
          'resizeImg?filename=' +
          "<span style='color:red'>" +
          'fjord.jpg' +
          '</span>' +
          '&width=ds&height=300' +
          '</B></h2>'
      );
    });
  });
  describe('tests processImage function resolve', () => {
    it('test processImagefunction', async () => {
      const response = await processImage(
        'assets/images/fjord.jpg',
        'assets/thumbs/fjord.jpg',
        500,
        500,
        res
      );
      expect(response).toBeTruthy;
    });
  });
});
