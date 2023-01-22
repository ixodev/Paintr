/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

/**
 * @description Run a web server that use the resizer to resize images. Put the type parameter to "upscale" to create the output in the upscaled directory
 * 
 * @author KodeurKubik
 */
module.exports = function () {
    const fs = require('fs');
    const express = require('express');
    const app = express();
    const config = require('../config.js');
    const { resize } = require('./index.js');

    // Default page
    app.get('/', (req, res) => res.status(200).send('Welcome on the resizer!\nThe page /resize is available on this site.'))

    // Listen to the /resize page
    app.get('/resize', async (req, res) => {
        let image_ID = req.query?.image_ID,
            width = req.query?.width,
            height = req.query?.height;

        // Get the type of the resize (upscale...)
        let type = req.query?.type

        if (!image_ID || !fs.existsSync(`${config.paths.all}/${image_ID}.jpg`)) return res.status(400).send('File not specified or not found. (?image_ID=IMAGEID&width=WIDTH&height=HEIGHT)');
        if (!width) return res.status(400).send('Width of the image is not defined. (?image_ID=IMAGEID&width=WIDTH&height=HEIGHT)');
        if (!height) return res.status(400).send('Height of the image is not defined. (?image_ID=IMAGEID&width=WIDTH&height=HEIGHT)');

        // Edit and send the file
        let filePath = await resize(image_ID, width, height, (type == 'upscale') ? `${config.paths.upscaledImages}` : undefined);
        //res.sendFile(filePath);
        res.send(filePath);
    });


    // Send 404 if page don't exist
    app.use((req, res) => res.sendStatus(404));

    // Listen on the port
    app.listen(config.ports.resizer);
}