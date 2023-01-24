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
 * @param {String} image_ID The image ID that is in the config "all" folder
 * @param {Number} percent The percentage of random pixels to add
 * @returns Path to the generated image
 * 
 * @author GreyWolf-dev & KodeurKubik
 */
module.exports.bruit = async function (image_ID, percent) {
    // Check that every parameter exists and is correct
    if (!image_ID || !fs.existsSync(`${config.paths.bruiter}/${image_ID}.jpg`)) throw new TypeError('BRUIT: Image ID was not specified or does not exists.');
    if (!percent || isNaN(percent) || percent >= 100) throw new TypeError('BRUIT: The percentage must be a number less than 100!');

    return new Promise((resolve) => {
        config.log.info(`BRUIT: Bruiting existing image (${image_ID}) by ${percent}%`)

        // Read the image and use it with jimp
        Jimp.read(`${config.paths.all}/${image_ID}.jpg`, async (err, image) => {
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
            image.writeAsync(`${config.paths.bruiter}/${percent}P_${image_ID}.jpg`).then(() => {
                return resolve(`${config.paths.bruiter}/${percent}P_${image_ID}.jpg`);
            });
        })
    });
};

/**
 * @description Create a fully random image with random pixels.
 * @returns Path to the PNG generated image
 * @param {Number} width The width of the generated image
 * @param {Number} height The height of the generated image
 * 
 * @author GreyWolf-dev & KodeurKubik
 */
module.exports.fullBruit = async function (width, height) {
    // Check that every parameter exists and is correct
    if (!width || isNaN(width)) throw new TypeError('FULLBRUIT: Width was not specified or is not a number!');
    if (!height || isNaN(height)) throw new TypeError('FULLBRUIT: Height was not specified or is not a number!');

    config.log.info(`FULLBRUIT: Generating ${width}x${height} Bruited image`)

    return new Promise((resolve) => {
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
        let filePath = `${config.paths.fullBruit}/${Date.now()}.jpg`;
        image.writeAsync(filePath).then(() => {
            resolve(filePath);
        });
    })
};