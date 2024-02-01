import { Client, EmbedBuilder, Events } from 'discord.js';
import fs from 'fs'
import path from 'path'

export const name = Events.ClientReady;
export const once = true;
export async function execute(client: Client, guild: any) {
	const embed = new EmbedBuilder()
		.setTitle('Ready!')
		.setDescription('Logged in as ' + client.user!.tag)
		.setColor('#443221');
	const logChannel = client.channels.cache.get("1159220242464116886");
	console.log(`Ready!\nLogged in as ${client.user!.tag}!`);
	client.user!.setPresence({ activities: [{ name: 'Javascript' }] });

	const dirName = path.resolve(__dirname, '..', '..', "src", "audio")
	console.log(dirName);

	try {
		if (!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName)
		}

		for (const file of await fs.promises.readdir(dirName)) {
			if (file.length == 0) continue
			fs.unlink(path.join(dirName, file), (err) => {
			});
		}
		
	} catch (error) {
		console.error("Error reading directory:", error);
	}
}