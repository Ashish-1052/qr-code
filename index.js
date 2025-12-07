/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import { writeFile, createWriteStream } from "fs";
import qr from "qr-image";
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
        type: "input",
        name: "url",
        message: "Enter your URL: ",
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
    writeFile("input.txt", answers.url, (err) => {
      if (err) {
        console.log(err);
      }
    })
    var qr_svg = qr.image(answers.url, { type: 'png' });
    qr_svg.pipe(createWriteStream('my-qr.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      throw new Error("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      throw error;
    }
  });