import "dotenv/config";

import {
  Client,
  GatewayIntentBits,
  Events,
  Partials,
  ActivityType,
} from "discord.js";

const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials),
});

client.on(Events.ClientReady, async () => {
  client.user.setActivity({
    type: ActivityType.Watching,
    name: "my boot logs",
  });

  console.log(`Bot has started! Logged in as ${client.user.tag}`);

  client.user.setActivity({
    type: ActivityType.Playing,
    name: "with my dice...",
  });
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.guild)
    return message.reply("I can only be used in servers right now, sorry! D:");

  const prefix = `<@${client.user.id}>`;

  if (message.content.startsWith(prefix)) {
    try {
      const [command, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

      (await import(`./MessageCreate.Commands/${command}.js`)).default({
        message,
        args,
      });
    } catch (error) {
      console.log(error);
      message.channel.send("That command does not exist.");
    }
  }
});

await client.login(process.env.DISCORD_BOT_TOKEN);
