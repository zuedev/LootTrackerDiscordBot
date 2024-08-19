import getItem from "../helpers/items/get.js";

export default async ({ message, args }) => {
  const itemName = args[0].toLowerCase();

  console.log(
    `Getting quantity of "${itemName}" for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const quantity = await getItem({ channelId: message.channel.id, itemName });

  await message.reply(
    `This channel has \`${quantity}\` **${itemName}** stored.`
  );
};
