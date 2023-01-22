/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const { SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");

/**
 * @description Exports the slash command
 * 
 * @author KodeurKubik
 */
module.exports.slash = new SlashCommandBuilder()
    .setName('upscale')
    //.setNameLocalization('fr', 'upscale')
    .setDescription('Upscale a bad image to make it increadible')
    .setDescriptionLocalization('fr', 'Upscale une mauvaise image pour la rendre incroyable')
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addAttachmentOption(opt =>
        opt.setName('file')
            .setNameLocalization('fr', 'fichier')
            .setDescription('The file to upscale')
            .setDescriptionLocalization('fr', 'Le fichier a upscaler')
            .setRequired(true)
    )


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

    // Get the image
    const file = interaction.options.getAttachment('file');

    if (file.contentType != 'image/jpg' && file.contentType != 'image/jpeg') return await interaction.editReply({ content: '❌ This image is not a JPG!' })

    // Answer to the interaction with the asked prompt
    await interaction.editReply({
        content: `Upscaling image - Waiting to start <@${interaction.member.id}>`,
        embeds: [
            new EmbedBuilder()
                .setColor('NotQuiteBlack')
                .setImage(file.url)
        ]
    })


    // TODO: Answer the interaction with the upscaled image
}