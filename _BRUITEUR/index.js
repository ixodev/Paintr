/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const fs = require('fs');
const Jimp = require('jimp')
const config = require('../config.js');

/**
 * @description Adds random pixels to the specified image to train the AI for example.
 * @param {String} image_ID
 * @param {Number} percent
 * @returns Path to the generated image
 * 
 * @author GreyWolf-dev & KodeurKubik
 */
module.exports.bruit = async function (image_ID, percent) {
    // Check if the file exists and if the percent is lower than 100
    if (!fs.existsSync(`${config.paths.brut}/${image_ID}.png`)) throw new TypeError('The specified file does not exist!');
    if (percent >= 100) throw new TypeError('The specified percentage is bigger or equal to 100!');

    // Read the image and use it with jimp
    await Jimp.read(`${config.paths.brut}/${image_ID}.png`, async (err, image) => {
        // Calculate the number of pixels to replace and round it
        var nbPixels = Math.round((image.bitmap.width * image.bitmap.height) / 100 * percent);

        // Create a list of pixels that are already replaced
        var alreadyReplaced = [];
        // For loop for every pixel to replace
        for (let i = 0; i < nbPixels; ++i) {
            // Take a random position and a random color
            let x, y, rbg = [0, 0, 0].map(() => Math.floor(Math.random() * 255));

            while (alreadyReplaced.includes([x, y]) || !x || !y) {
                x = Math.floor(Math.random() * image.bitmap.width);
                y = Math.floor(Math.random() * image.bitmap.height);
            }

            // Replace the pixel with the random color
            image.setPixelColor(Jimp.rgbaToInt(rbg[0], rbg[1], rbg[2], 255), x, y);
            alreadyReplaced.push([x, y]);
        };

        // Save the image and set the prefix of the image name and return its path
        await image.writeAsync(`${config.paths.bruit}/${percent}P_${image_ID}.png`);
        return `${config.paths.bruit}/${percent}P_${image_ID}.png`;
    });
};

/**
 * @description Create a fully random image with random pixels.
 * @returns Path to the PNG generated file
 * @param {String} image_ID
 * @param {Number} percent
 * 
 * @author GreyWolf-dev & KodeurKubik
 */
module.exports.fullBruit = async function (width, height) {
    // Create an image with the specified dimensions
    const image = new Jimp(width, height);

    // Loop for every pixel in the image
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // Create a random color and apply it 
            let rgb = [0, 0, 0].map(() => Math.floor(Math.random() * 255));
            image.setPixelColor(Jimp.rgbaToInt(rgb[0], rgb[1], rgb[2], 255), x, y);
        }
    };

    // Write the image and return its path
    let filePath = `${config.paths.random}/${Date.now()}.png`;
    await image.writeAsync(filePath);

    return filePath;
};