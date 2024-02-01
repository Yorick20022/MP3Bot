const { Events, AuditLogEvent } = require('discord.js');

module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    once: false,
    async execute(entry: any, guild: any) {
        if (entry.action === AuditLogEvent.ChannelCreate) {
            const badChannelNames = ["badword", "badword2"]
            const logChannel = await guild.channels.cache.get("1159220242464116886")
            if (badChannelNames.some(word => entry.target.name.toLowerCase().includes(word))) {
                await entry.target.delete()
                await logChannel.send(`Deleted channel "${entry.target.name}" because it contained the word: "${badChannelNames.find(word => entry.target.name.toLowerCase().includes(word))}"`)
            }
        }
    },
};