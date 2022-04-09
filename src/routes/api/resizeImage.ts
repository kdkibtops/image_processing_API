import express from 'express';
import helperFunctions from '../../helperFunctions';
import NodeCache from 'node-cache';

const processImage = helperFunctions.processImage;
const throwErrorMsg = helperFunctions.throwErrorMsg;
const checkFileFunc = helperFunctions.checkFileFunc;

const resizeImg = express.Router();
const appCash = new NodeCache();

// route function
resizeImg.get(
  '/resizeImg',
  (req: express.Request, res: express.Response): void => {
    const assetsFolder = './assets/';
    const sendFileOptions = {
      root: './assets/thumbs',
    };
    // checks if the user entered input data, if not will ask user to do so
    if (!req.query.filename || !req.query.width || !req.query.height) {
      res.send(
        '<h1>Please enter perefeences as query params after the url</h1><h2 style="color:blue">http://localhost:3000/resizeImg?filename=<b>imagename.ext</b>&amp;width=<b>200</b>&amp;height=<b>200</b></h2>'
      );
    } else {
      // retrieve input data from the entered url
      const imgName = req.query.filename as string;
      const imgPath = assetsFolder + 'images/' + (req.query.filename as string);
      const imgWidth = parseInt(req.query.width as string);
      const imgHeight = parseInt(req.query.height as string);
      const distImgName = imgWidth + '_' + imgHeight + '_' + imgName;
      const targetPath =
        assetsFolder + 'thumbs/' + imgWidth + '_' + imgHeight + '_' + imgName;

      // async function to process the image
      const processImageFunction = async (): Promise<void> => {
        try {
          const resolved = await processImage(
            imgPath,
            targetPath,
            imgWidth,
            imgHeight,
            res
          );
          if (resolved) {
            while (!checkFileFunc(distImgName, 'thumbs/')) {
              checkFileFunc(distImgName, 'thumbs/');
            }
            if (checkFileFunc(distImgName, 'thumbs/')) {
              setTimeout(() => {
                res.sendFile(distImgName, sendFileOptions);
              }, 500);
            }
          } else {
            if (imgWidth === 0) {
              const widthErrorMsg =
                "<h1 style='color:red'>Width must be a valid postive number and not equal to 0!</h1><br><h2>Check the width @: ...";
              const errorMsg = throwErrorMsg(
                req.originalUrl,
                'width=',
                req.query.width as unknown as string
              );
              res.send(widthErrorMsg + errorMsg);
            } else if (imgHeight === 0) {
              const heightErrorMsg =
                "<h1 style='color:red'>Height must be a valid postive number and not equal to 0!!</h1><br><h2>Check the height @: ...";
              const errorMsg = throwErrorMsg(
                req.originalUrl,
                'height=',
                req.query.height as unknown as string
              );
              res.send(heightErrorMsg + errorMsg);
            }
          }
        } catch (error) {
          res.send(error);
        }
      };
      // Checks if the request was done before
      if (appCash.has(distImgName)) {
        // confirm that file is still present in folder and was not deleted by user
        if (checkFileFunc(distImgName, 'thumbs/')) {
          // if the file is still present, will retrieve it from cache
          res.sendFile(distImgName, sendFileOptions);
        } else {
          // if file is missing, will go through the process again
          const cashKey = processImageFunction();
          appCash.set(distImgName, cashKey);
        }
      } else {
        // input data validation
        if (isNaN(imgHeight)) {
          const heightErrorMsg =
            "<h1 style='color:red'>Height must be a valid number, numerics are the only allowed!</h1><br><h2>Check the height @: ...";
          const errorMsg = throwErrorMsg(
            req.originalUrl,
            'height=',
            req.query.height as unknown as string
          );
          res.send(heightErrorMsg + errorMsg);
        } else if (isNaN(imgWidth)) {
          const widthErrorMsg =
            "<h1 style='color:red'>Width must be a valid number, numerics are the only allowed!</h1><br><h2>Check the width @: ...";
          const errorMsg = throwErrorMsg(
            req.originalUrl,
            'width=',
            req.query.width as unknown as string
          );
          res.send(widthErrorMsg + errorMsg);
        } else if (checkFileFunc(imgName, 'images/') === false) {
          const errorMsg = throwErrorMsg(req.originalUrl, 'filename=', imgName);
          const fileNameErrorMsg =
            "<h1 style='color:red'>The requested image is not available!</h1><br><h2>Check the filename @: ...";
          res.send(fileNameErrorMsg + errorMsg);
        } else {
          // if all data are valid, and operation is not in cache, will process the image
          const cashKey = processImageFunction();
          appCash.set(distImgName, cashKey);
        }
      }
    }
  }
);

export default resizeImg;
