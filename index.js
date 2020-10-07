// require the discord.js module
const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
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

//Funcionalidade para mutar geral
client.on("message", async (message) => {
  const voiceChannel = message.member.voice.channel;
  const hasPermission = message.member.hasPermission([
    "MANAGE_ROLES",
    "ADMINISTRATOR",
  ]);

  if (hasPermission) {
    if (message.content === "!mute") {
      for (let member of voiceChannel.members) {
        member[1].voice.setMute(true);
      }
    } else if (message.content === "!unmute") {
      for (let member of voiceChannel.members) {
        member[1].voice.setMute(false);
      }
    }
  } else {
    message.reply("você não tem permissão para executar o comando!!");
  }
});

client.on("message", async (message) => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  //if (!message.guild) return;
  const voiceChannel = message.member.voice.channel;

  if (voiceChannel) {
    if (message.content === "!carine") {
      const connection = await message.member.voice.channel.join();
      connection.play("audio/carine.mp3");
    } else if (message.content === "!calate") {
      const connection = await message.member.voice.channel.join();
      connection.play("audio/calate.mp3");
    } else if (message.content === "!brbr") {
      const connection = await message.member.voice.channel.join();
      connection.play("audio/brbr.mp3");
    }
  } else {
    message.reply("You need to join a voice channel first!");
  }
});

// Bot de música
client.on("message", async (message) => {
  const musica = message.content;
  const desestruct = musica.split(" ");
  const link = desestruct[1];

  if (message.content === `!play ${link}`) {
    // Variável que contém o canal de voz que o usuário está atualmente
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply("Entre em um canal de voz primeiro!");
    }

    const connection = await voiceChannel.join();
    const watcher = connection.play(
      ytdl(link, {
        filter: "audioonly",
        quality: "highest",
      })
    );

    /*if (message.content === "!stop") {
      watcher.on.
    } else if (message.content === "!resume") {
      watcher.resume();
    }*/

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
  /*const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply("Entre em um canal de voz primeiro!");
  }*/
});

// login to Discord with your app's token
client.login(token);
