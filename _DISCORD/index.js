/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

/**
 * @description Run a Discord bot that create a cool user interface to use this AI
 * 
 * @author KodeurKubik
 */
module.exports = function () {
    const { Client, IntentsBitField, Events, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
    const { readdirSync, readFileSync, writeFileSync, renameSync, rmSync, existsSync } = require('fs');
    const client = new Client({ shards: 'auto', intents: Object.keys(IntentsBitField.Flags).filter(i => isNaN(i)) });
    const config = require('../config.js');
    const chalk = require('chalk');


    // When the bot receive an interaction
    client.on(Events.InteractionCreate, async (interaction) => {
        // If the interaction is a Slash command
        if (interaction.isCommand()) {
            // Get the command name and run from the /cmd/ folder
            const name = interaction.commandName;
            require(`./cmd/${name}.js`).run(client, interaction);
        }


        // Else if the interaction is a button clicked
        else if (interaction.isButton()) {
            // Get the id of the button
            const customid = interaction.customId;

            // If the interaction is to add a description to an image
            if (customid.startsWith('adddescr-')) {
                return
                // Reply to the interaction by showing a modal where the user can type
                interaction.showModal(
                    new ModalBuilder()
                        .setTitle('Add a description to this image')
                        .setCustomId(customid)
                        .setComponents(
                            new ActionRowBuilder()
                                .addComponents(
                                    new TextInputBuilder()
                                        .setCustomId('input')
                                        .setLabel('The description')
                                        .setRequired(true)
                                        .setStyle(TextInputStyle.Paragraph)
                                )
                        )
                );
            }
        }


        // Else if the interaction is a modal submitted
        else if (interaction.isModalSubmit()) {
            // Get the custom ID
            const customid = interaction.customId;

            // If the interaction is to add a description to an image
            if (customid.startsWith('adddescr-')) {
                return
                // Get the image setName
                const name = customid.replace('adddescr-', '');
                // Get the description gived by the user
                const descr = interaction.fields.getTextInputValue('input');

                // Save the description gived by the user
                writeFileSync(`${config.paths.imageDescriptions}/${name.replace('.jpg', '.txt')}`, String(descr), { flag: 'wx' });


                // Update to a new image
                // Get a new random file
                let filedir = readdirSync(`${config.paths.upscaledImages}`).filter(f => f.endsWith('.jpg') && !existsSync(`${config.paths.imageDescriptions}/` + f.replace('.jpg', '')));
                let length = filedir.length;
                let filename = filedir?.[0];
                delete filedir;
                // If there is no more files, return
                if (!filename) return interaction.update({ content: 'ON A TOUT FINIIII', embeds: [], components: [], files: [] });

                let filepath = `${config.paths.upscaledImages}/${filename}`;
                
                // Update the message to change the file
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Green')
                            .setTitle('Cliquez sur le bouton et écrivez une description (au mieux détaillé) __EN ANGLAIS__')
                            .setImage(`attachment://${filename}`)
                            .setFooter({ text: `${length} images left` })
                    ],
                    files: [new AttachmentBuilder(readFileSync(`${filepath}`), { name: `${filename}` })],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`adddescr-${filename}`)
                                    .setLabel('Add description')
                                    .setStyle(ButtonStyle.Primary)
                            )
                    ]
                });
            }
        }
    })


    // When the bot is ready (is triggered only one time)
    client.once(Events.ClientReady, async () => {
        console.log("*" + chalk.blue(` Bot logged in as @${client.user.tag} `) + "*");
        console.log("*********************************");

        // Create all the commands that are in the /cmd/ folder
        client.application.commands.set(readdirSync(__dirname + `/cmd/`).filter(file => file.endsWith('.js')).map(file => (require(`./cmd/${file}`).slash)));
    });

    // Log in
    client.login(config.discord.token);
}