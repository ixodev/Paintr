/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const prefix = `${__dirname}/images` // '/Volumes/Paintr'

module.exports = {
    paths: {
        all: prefix + '/all',
        bruiter: prefix + '/bruit',
        fullBruit: prefix + '/random',
        resizer: prefix + '/ready',
    },
    ports: {
        bruiteur: 9001,
        resizer: 9002,
        generator: 9003,
        upscaler: 9004,
    }
}