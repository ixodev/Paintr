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
 * @description Change the size of an image to the specified width and height but with the same ratio
 * @param {String} image_ID The image ID that is in the config "brut" folder
 * @param {Number} width The width of the generated image
 * @param {Number} height The height of the generated image
 * @returns Path to the resized image
 * 
 * @author KodeurKubik
 */
module.exports.resize = async function (image_ID, width, height) {
    return new Promise((resolve) => {
        // Check if the file exists
        if (!fs.existsSync(`${config.paths.all}/${image_ID}.png`)) throw new TypeError('The specified file does not exist!');
        if (!width || isNaN(width)) throw new TypeError('Width was not specified or is not a number!');
        if (!height || isNaN(height)) throw new TypeError('Height was not specified or is not a number!');

        // Read the image and use it with jimp
        Jimp.read(`${config.paths.all}/${image_ID}.png`, async (err, image) => {
            if (err) throw new Error(err);

            // Resize it to the specified dimensions
            image
                .cover(parseInt(width), parseInt(height))
                // Save the image and set the prefix of the image name and return its path
                .writeAsync(`${config.paths.resizer}/${image_ID}.png`)
                .then(() => {
                    return resolve(`${config.paths.resizer}/${image_ID}.png`);
                });
        });
    });
};