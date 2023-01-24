/********************************
*  ____       _       _         *
* |  _ \ __ _(_)_ __ | |_ _ __  *
* | |_) / _` | | '_ \| __| '__| *
* |  __/ (_| | | | | | |_| |    *
* |_|   \__,_|_|_| |_|\__|_|    *
* © GreyWolf-dev & KodeurKubik  *
*********************************/

const { SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fetch = require("node-fetch");
const fs = require('fs');
const config = require("../../config");

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
    if (file.contentType != 'image/jpg' && file.contentType != 'image/jpeg' && file.contentType != 'image/jpg' && file.contentType != 'image/png') return await interaction.editReply({ content: '❌ This image is not a JPG or a PNG file!' });
    if (file.width > 100 || file.height > 100) return await interaction.editReply({ content: `❌ File too big to upscale! Max width and height are 100.\n> To upscale bigger images, use \`</light-upscale:${client.application.id}>\`.` })
    console.log(file)

    // Answer to the interaction with the asked prompt
    await interaction.editReply({
        content: `Upscaling image - Waiting to start <@${interaction.member.id}>`,
        embeds: [
            new EmbedBuilder()
                .setColor('NotQuiteBlack')
                .setImage(file.url)
        ]
    });

    let now_seconds = Math.round(Date.now() / 1000);
    let file_prefix = `${config.paths.discordUpscales}`;
    let filename = `${interaction.member.id}-${now_seconds}-${file.name}`;

    console.log(filename);
    // Download the file locally to upscale it
    fetch(file.url)
        .then(async res => {
            res.body.pipe(fs.createWriteStream(file_prefix + '/uploads/' + filename));

            // Edit the interaction
            await interaction.editReply({
                content: `Upscaling image **5%** - <@${interaction.member.id}>`,
                embeds: [
                    new EmbedBuilder()
                        .setColor('NotQuiteBlack')
                        .setImage(file.url)
                ]
            });

            let upscaleOnce_RAW = await fetch(`http://localhost:${config.ports.upscaler}/upscale?input=${encodeURIComponent(file_prefix + '/uploads/' + filename)}&output=${encodeURIComponent(file_prefix + '/x4/' + filename)}`);
            let upscaleOnce = await upscaleOnce_RAW.text();
            let now = Date.now();

            // Edit the interaction
            await interaction.editReply({
                content: `Upscaling image **45%** - <@${interaction.member.id}>`,
                embeds: [
                    new EmbedBuilder()
                        .setColor('NotQuiteBlack')
                        .setImage(`attachment://4x-${interaction.member.id}-${now}`)
                ],
                files: [new AttachmentBuilder(fs.readFileSync(upscaleOnce), { name: `4x-${interaction.member.id}-${now}` })]
            });


            let upscaleTwice_RAW = await fetch(`http://localhost:${config.ports.upscaler}/upscale?input=${encodeURIComponent(file_prefix + '/x4/' + filename)}&output=${encodeURIComponent(file_prefix + '/x8/' + filename)}`);
            let upscaleTwice = await upscaleTwice_RAW.text();

            // Edit the interaction
            await interaction.editReply({
                content: `Image upscaled! - <@${interaction.member.id}>`,
                embeds: [
                    new EmbedBuilder()
                        .setDescription('**Original**')
                        .setColor('NotQuiteBlack')
                        .setImage(file.url),

                    new EmbedBuilder()
                        .setDescription('**Upscaled x8**')
                        .setColor('NotQuiteBlack')
                        .setImage(`attachment://8x-${interaction.member.id}-${now}`)
                ],
                files: [new AttachmentBuilder(fs.readFileSync(upscaleTwice), { name: `8x-${interaction.member.id}-${now}` })]
            });
        })
}