/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

/**
 * @description Run a web server that use the upscaler to upscale images (only x4 upscale!!)
 * 
 * @author KodeurKubik
 */
module.exports = function () {
    const fs = require('fs');
    const { exec } = require('child_process');
    const express = require('express');
    const app = express();
    const config = require('../config.js');

    // Default page
    app.get('/', (req, res) => res.status(200).send('Welcome on the bruiter!\nThe page /upscale is available on this site.'))

    // Listen to the /bruit page
    app.get('/upscale', async (req, res) => {
        // Create the variables and return if not defined
        let input = decodeURIComponent(req.query?.input);
        let output = decodeURIComponent(req.query?.output);

        if (!input || !fs.existsSync(input)) return res.status(400).send('File not specified or not found. (?input=INPUT_PATH&output=OUTPUT_PATH)');
        if (!output) return res.status(400).send('File not specified or not found. (?input=INPUT_PATH&output=OUTPUT_PATH)');


        // Run the executable file that upscales the image
        exec(`cd _UPSCALER && ./upscale -i ${input} -o ${output} -n realesrgan-x4plus`, async (error) => {
            if (error) { res.send(error); config.log.error(`UPSCALE SERVER: ${error}`); return };
    
            //res.sendFile(output);
            res.send(output);
        });
    });


    // Send 404 if page don't exist
    app.use((req, res) => res.sendStatus(404));

    // Listen on the port
    app.listen(config.ports.upscaler);
}