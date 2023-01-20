/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/


module.exports = {
    paths: {
        brut: __dirname + '/images/brut',
        bruit: __dirname + '/images/bruit',
        random: __dirname + '/images/random',
    },
    ports: {
        bruiteur: 9001,
        generator: 9002,
        upscaler: 9003,
    }
}