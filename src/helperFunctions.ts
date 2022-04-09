import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import express from 'express';

// function to check the presence of a file in a specified directory
const checkFileFunc = (imgName: string, searchDirectory: string): boolean => {
  const imagePath = path.resolve(
    __dirname,
    './../assets/',
    searchDirectory,
    imgName
  );
  const res = fs.existsSync(imagePath);
  if (res) {
    return res;
  } else {
    return false;
  }
};

// a function to create an Error string to be passed for the user in case of wrong input accordingly
function throwErrorMsg(
  orgURL: string,
  parameterName: string,
  errParam: string
): string {
  const index = orgURL.search(parameterName);
  const position = index + parameterName.length;
  const str1 = orgURL.slice(0, position);
  const str2 = orgURL.slice(position + errParam.length, orgURL.length);
  const Msg =
    '<B>' +
    str1 +
    "<span style='color:red'>" +
    errParam +
    '</span>' +
    str2 +
    '</B></h2>';
  return Msg;
}

// async function to process the image using sharp dependency
async function processImage(
  imgPath: string,
  targetPath: string,
  toWidth: number,
  toHeight: number,
  response: express.Response
): Promise<boolean> {
  try {
    await sharp(imgPath)
      .resize(toWidth, toHeight)
      .toFile(targetPath, (err, info) => {
        if (err !== null) {
          response.send(err);
        }
      });
    return true;
  } catch (error) {
    return false;
  }
}

export default { throwErrorMsg, processImage, checkFileFunc };
