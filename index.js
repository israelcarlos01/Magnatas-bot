// require the discord.js module
const Discord = require("discord.js");
const { token, prefix, link } = require("./config.json");
const ytdl = require("ytdl-core");

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Ready!");
});

//Mensagem de boas vindas para um membro novo.
client.on("guildMemberAdd", (member) => {
  member.send(`Agora você é um TCHOLA!`);
});

// Bot de música
client.on("message", async (message) => {
  if (message.content === "!play") {
    // Variável que contém o canal de voz que o usuário está atualmente
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply("Entre em um canal de voz primeiro!");
    }

    const connection = await voiceChannel.join();
    const watcher = connection.play(
      ytdl("https://www.youtube.com/watch?v=tNcMrdAeJeU&ab_channel=LilWhind", {
        filter: "audioonly",
        quality: "highest",
      })
    );

    watcher.on("end", () => voiceChannel.leave());
  }
});

client.on("message", (message) => {
  if (message.content === "!ping") {
    // send back "Pong." to the channel the message was sent in
    message.channel.send("Pong.");
  } else if (message.content === `${prefix}server`) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  }
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply("Entre em um canal de voz primeiro!");
  }
});

// login to Discord with your app's token
client.login(token);
