/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const chalk = require('chalk');
const prefix = '/Volumes/KubikDisk/Paintr' // `${__dirname}/images`

module.exports = {
    paths: {
        all: prefix + '/ready/tolabel',
        bruiter: prefix + '/bruit',
        fullBruit: prefix + '/random',
        resizer: prefix + '/ready/images',

        imageDescriptions: prefix + '/ready/descriptions',
        readyImages: prefix + '/ready/images',
        upscaledImages: prefix + '/ready/upImages',
    },
    ports: {
        bruiteur: 9001,
        resizer: 9002,
        generator: 9003,
        upscaler: 9004,
    },
    discord: {
        token: 'Nzk0NTI3OTYwNjc3NDgyNTY2.GLTI9h.R1N9O5819E9Y1ROChh6yny8QH0L3umxtrrU0iU',
        client_id: '794527960677482566',
        client_secret: 'yWfFsC-2x8lMlAnZbpt7VzNiHIEyGsbJ',
        public_key: '79e7fe37125e4e1858bb8c3b7518100b824540886732f5b178ca2809f66ec7e1',
    },
    log: {
        success: (text) => console.log('[✅] ' + chalk.green(text)),
        info: (text) => console.log('[⚠️] ' + chalk.yellow(text)),
        error: (text) => console.log('[‼️] ' + chalk.red(text)),
    }
}