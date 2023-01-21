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

var running = true;
while(running) {
    var cmd = readline.question("Enter a command: ");
    switch(cmd) {
        case "/exit": console.log("Bye!"); running = false; break;
        case "/search": var image = readline.question("Please enter a description: "); /* ... */ break;
    }
}

// Initialising the ??
// console.log("*      Ready and launched!      *");