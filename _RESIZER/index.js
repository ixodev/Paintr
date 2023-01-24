/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const fs = require('fs');
const Jimp = require('jimp');
const config = require('../config.js');

/**
 * @description Change the size of an image to the specified width and height but with the same ratio
 * @param {String} image_ID The image ID that is in the config "brut" folder
 * @param {Number} width The width of the generated image
 * @param {Number} height The height of the generated image
 * @param {String} input The input directory of the generated image
 * @param {String} output The output directory of the generated image
 * @returns Path to the resized image
 * 
 * @author KodeurKubik
 */
module.exports.resize = async function (image_ID, width, height, input, output) {
    // Check that every parameter exists and is correct
    if (!fs.existsSync(`${input}/${image_ID}.jpg`)) throw new TypeError('RESIZE: The specified file does not exist!');
    if (!width || isNaN(width)) throw new TypeError('RESIZE: Width was not specified or is not a number!');
    if (!height || isNaN(height)) throw new TypeError('RESIZE: Height was not specified or is not a number!');

    config.log.info(`RESIZE: Resizing image ${image_ID} to ${width}x${height}`)

    return new Promise((resolve) => {
        // Read the image and use it with jimp
        Jimp.read(`${input}/${image_ID}.jpg`, async (err, image) => {
            if (err) throw new Error(err);

            // Resize it to the specified dimensions
            image
                .cover(parseInt(width), parseInt(height))
                // Save the image and set the prefix of the image name and return its path
                .writeAsync((output) ? `${output}/${image_ID}.jpg` : `${config.paths.resizer}/${image_ID}.jpg`)
                .then(() => {
                    return resolve((output) ? `${output}/${image_ID}.jpg` : `${config.paths.resizer}/${image_ID}.jpg`);
                });
        });
    });
};