/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

// TODO: Finish that

const { readdirSync, readFileSync, existsSync } = require('fs');
const config = require('../config.js');
const Jimp = require('jimp');

/**
 * @description Convert every file from the specified folder to the specified width and height
 * @param {String} from Path to the original images
 * @param {Number} width The width of the result
 * @param {Number} height The height of the result
 * @param {String} to Where the converted images are saved
 * 
 * @author KodeurKubik
 */
async function convertFile(from, width, height, to) {
    // Check that every parameter exists and is correct
    if (!from || !existsSync(from)) throw new TypeError('CONVERTFILE: From was not specified or is not a correct path.');
    if (!width || isNaN(width)) throw new TypeError('CONVERTFILE: Width was not specified or is not a number!');
    if (!height || isNaN(height)) throw new TypeError('CONVERTFILE: Height was not specified or is not a number!');
    if (!to || !existsSync(to)) throw new TypeError('CONVERTFILE: To was not specified or is not a correct path.');

    // Take every file of the "from" folder
    let files = readdirSync(from).filter(f => f.endsWith('.jpg'));

    config.log.info(`CONVERTFILE: Converting ${files.length} files to ${width}x${height}`);

    // Loop for every file
    files.forEach(async (file) => {
        const image = await Jimp.read(`${from}/${file}`);

        const url = new URL(`http://localhost:${config.ports.resizer}/resize`);
        url.searchParams.set('image_ID', file.replace('.jpg', ''));
        url.searchParams.set('width', width);
        url.searchParams.set('height', height);
        url.searchParams.set('input', from);
        url.searchParams.set('output', to);


        // Resize the image to a square and upscale it
        let filepathres = await fetch(url);
        let filepath = await filepathres.text();

    })



    // Resize the image to a small square to then train the AI to upscale
    await fetch(`http://localhost:${config.ports.resizer}/resize?image_ID=${filename.replace('.jpg', '')}&width=64&height=64`);
}

convertFile()