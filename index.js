const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
const client = new Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_SCHEDULED_EVENTS"]});
const {prefix, token} = require('./config.json');

client.on("messageDelete", message => {
    const shamecounter = new MessageEmbed()
        .setColor('#32ADAB')
        .setTitle(`SHAME ${message.author.tag}`)
        .setDescription(`**messed up with**\r\n${message.content}`)
        .setTimestamp();
    const countchannel = message.guild.channels.cache.find(i => i.name === 'counting🔢');
    const shamelog = message.guild.channels.cache.find(i => i.name === 'shame-leaderboard🤡');
    if(message.channel === countchannel) {  
        shamelog.send({ embeds: [shamecounter] });
    };
    if(message.channel !== countchannel) return;
});

client.on("messageCreate", async message => {
    const args = message.content.split(/ +/g);
    const command = args[0];
    if(message.author.bot) return;
    if(command.startsWith(`${prefix}h`)){
        execute(message);
    };
});

async function execute(message) {
    const args = message.content.split(/ +/g);
    const command = args[0];
    if(command === `${prefix}h` || command === `${prefix}help`){
        message.channel.send(`Help Menu`);
    };
};

client.on("ready", () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() +1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    console.log('\x1b[1m\x1b[36m%s\x1b[37m%s\x1b[0m', `\r\n\n${client.user.tag}`, ' bot is online.');
    console.log(`\x1b[1m\x1b[34m%s\x1b[0m`, month + "-" + date + "-" + year + " " + hours + ":" + minutes + ":" + seconds + "\r\n");
});
client.login(token);