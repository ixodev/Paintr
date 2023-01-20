/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/


const express = require('express');
const app = express();
const config = require('../config.js');


app.get('/')


app.use((req, res) => res.sendStatus(404));

app.listen(config.ports.bruiteur);
console.log(`Bruiteur ready on port ${config.ports.bruiteur}`);