import { Client, EmbedBuilder, Events } from 'discord.js';

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
	if (!logChannel?.isTextBased()) return;
	await logChannel.send({ embeds: [embed] });
}