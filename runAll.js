const config = require('./config.js');
const chalk = require('chalk');
var readline = require("readline-sync");

console.log("*********************************");
console.log("*" + chalk.green("  ____       _       _         ") + "*");
console.log("*" + chalk.green(" |  _ \\ __ _(_)_ __ | |_ _ __  ") + "*");
console.log("*" + chalk.green(" | |_) / _` | | '_ \\| __| '__| ") + "*");
console.log("*" + chalk.green(" |  __/ (_| | | | | | |_| |    ") + "*");
console.log("*" + chalk.green(" |_|   \\__,_|_|_| |_|\\__|_|    ") + "*");
console.log("*" + chalk.magenta(" © GreyWolf-dev & KodeurKubik  ") + "*");
console.log("*********************************");

// Initializing the BRUITEUR
require('./_BRUITEUR/server.js')();
console.log("*" + chalk.blue(`  Bruiteur ready on port ${config.ports.bruiteur}  `) + "*");
console.log("*********************************");

// Initializing the BRUITEUR
require('./_RESIZER/server.js')();
console.log("*" + chalk.blue(`  Resizer ready on port ${config.ports.resizer}   `) + "*");
console.log("*********************************");


// Initialising the --
// console.log("*      Ready and launched!      *");


// Running the bot
require('./_DISCORD/index.js')();



// Catch errors to avoid crashing
process.on('unhandledRejection', async (error) => { console.error(chalk.red(error)); });
process.on('uncaughtException', async (error) => { console.error(chalk.red(error)); });