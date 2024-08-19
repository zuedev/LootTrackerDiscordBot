import addItem from "../helpers/items/add.js";

export default async ({ message, args }) => {
  const itemName = args[1].toLowerCase();
  const itemAmount = parseInt(args[0]);

  if (parseInt(itemName))
    return await message.reply(
      "Please provide a valid item name. Like this: `add 5 apples`."
    );

  if (isNaN(itemAmount) || itemAmount <= 0)
    return await message.reply(
      "Please provide a valid positive number. Like this: `add 5 apples`."
    );

  console.log(
    `Adding ${itemAmount} "${itemName}" to the database for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const newAmount = await addItem({
    channelId: message.channel.id,
    itemName,
    itemAmount,
  });

  await message.reply(
    `Changed the quantity of **${itemName}** from \`${
      newAmount - itemAmount
    }\` to \`${newAmount}\`.`
  );
};
