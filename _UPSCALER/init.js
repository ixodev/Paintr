/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const { readdirSync, readFileSync } = require('fs');
const config = require('../config.js');
const tf = require('@tensorflow/tfjs');
const Jimp = require('jimp');

async function run() {
    //const model = await tf.loadLayersModel('https://cdn.discordapp.com/attachments/1066648531135365121/1066648561233702922/model.json');
    const image = await Jimp.read(`/Volumes/KubikDisk/Paintr/ready/images/90007a2d446fe08b.jpg`);

    const imageTensor = tf.node.decodeJpeg(image.data, channels = 3);
    const upscaledImage = model.predict(imageTensor);


    const buffer = await tf.node.encodeJpeg(upscaledImage, channels = 3).toBuffer();

    fs.writeFileSync('/Volumes/KubikDisk/Paintr/ready/WOW.jpg', buffer);
}

run();