/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const { SlashCommandBuilder, PermissionFlagsBits, Client } = require("discord.js");

/**
 * @description Exports the slash command
 * 
 * @author KodeurKubik
 */
module.exports.slash = new SlashCommandBuilder()
    .setName('paint')
    .setNameLocalization('fr', 'peindre')
    .setDescription('Generate an image based on your description')
    .setDescriptionLocalization('fr', 'Génère une image basé sur votre description')
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption(opt =>
        opt.setName('description')
            .setNameLocalization('fr', 'description')
            .setDescription('The description of the image that you want')
            .setDescriptionLocalization('fr', 'La description de l\'image que vous voulez')
            .setRequired(true)
    );


/**
 * @description Run the command of this file
 * @param {Client} client The Discord client
 * @param {import("discord.js").Interaction} interaction The interaction to reply
 * 
 * @author KodeurKubik
 */
module.exports.run = async function (client, interaction) {
    // Defer reply to get more time to answer the interaction
    await interaction.deferReply({ ephemeral: false });

    // Get the prompt
    const prompt = interaction.options.getString('description');

    // Answer to the interaction with the asked prompt
    await interaction.editReply({
        content: `**${prompt}** - Waiting to start <@${interaction.member.id}>`
    })


    // TODO: Answer the interaction with the generated image
}