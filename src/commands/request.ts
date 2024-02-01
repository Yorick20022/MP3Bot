import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder, } from 'discord.js';
import fs from 'fs'
import path from 'path'
const ytdl = require("ytdl-core")

export const data = new SlashCommandBuilder()
    .setName('requestmp3')
    .setDescription('converts a YouTube URL to MP3 file')
    .addStringOption(option => option.setName('url').setDescription('YouTube URL').setRequired(true))
export async function execute(interaction: ChatInputCommandInteraction) {
    let ytUrl = interaction.options.getString('url');

    try {
        // Download the video using ytdl-core
        const sanitizeFilename = (filename: string) => {
            // Define a regex pattern to match characters not allowed in Windows filenames
            const forbiddenChars = /[<>:"/\\|?*]/g;
            // Replace forbidden characters with a hyphen because Windows XD
            return filename.replace(forbiddenChars, '-');
        };

        // Filter highest audio format
        const stream = ytdl(ytUrl, {
            filter: (format: { container: string; }) => format.container === 'mp4',
            quality: 'highestaudio', 
        });

        // Resolve path where to download the audio
        const audioPath = path.resolve(__dirname, '..', '..', "src", "audio")

        // Download the audio file
        stream.on('info', (info: { videoDetails: { title: string; }; }) => {
            const sanitizedTitle = sanitizeFilename(info.videoDetails.title);
            const outputPath = path.join(audioPath, `${sanitizedTitle}.mp3`);

            const outputStream = fs.createWriteStream(outputPath);
            stream.pipe(outputStream);

            const discordAttachment = [new AttachmentBuilder(outputPath, { name: `${sanitizedTitle}.mp3` })]

            // Send the file in Discord
            
            outputStream.on('finish', () => {
                interaction.reply({
                    files: discordAttachment
                });
            });

            // Delete file from directory after it has been sent in Discord.
            setTimeout(() => {
                fs.unlink(outputPath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }, 3000);
        });

    } catch {
        console.error();   
    }
}
