/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

/**
 * @description Run a web server that use the bruiter to answer requests
 * 
 * @author GreyWolf-dev & KodeurKubik
 */
module.exports = function () {
    const fs = require('fs');
    const express = require('express');
    const app = express();
    const config = require('../config.js');
    const { bruit, fullBruit } = require('./index.js');

    // Default page
    app.get('/', (req, res) => res.status(200).send('Welcome on the bruiter!\nThe pages /bruit and /fullBruit are available on this site.'))

    // Listen to the /bruit page
    app.get('/bruit', async (req, res) => {
        // Create the variables and return if not defined
        let image_ID = req.query?.image_ID,
            percent = req.query?.percent;

        if (!image_ID || !fs.existsSync(`${config.paths.all}/${image_ID}.jpg`)) return res.status(400).send('File not specified or not found. (?image_ID=FILENAME&percent=PERCENTAGE)');
        if (!percent || percent >= 100) return res.status(400).send('Percentage not specified or greater or equal to 100. (?image_ID=FILENAME&percent=PERCENTAGE)');

        // Generate the image and send the file
        let filePath = await bruit(image_ID, percent);
        //res.sendFile(filePath);
        res.send(filePath);
    });

    // Listen to the /fullBruit page
    app.get('/fullBruit', async (req, res) => {
        let width = req.query?.width,
            height = req.query?.height;

        if (!width) return res.status(400).send('Width of the image is not defined. (?width=WIDTH&height=HEIGHT)');
        if (!height) return res.status(400).send('Height of the image is not defined. (?width=WIDTH&height=HEIGHT)');

        // Generate and send the file
        let filePath = await fullBruit(width, height);
        //res.sendFile(filePath);
        res.send(filePath);
    });


    // Send 404 if page don't exist
    app.use((req, res) => res.sendStatus(404));

    // Listen on the port
    app.listen(config.ports.bruiteur);
}