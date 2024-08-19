import { connect } from "../controllers/mongo.js";

export default async ({ message, args }) => {
  console.log(
    `Getting quantity of "${args[0]}" for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const mongo = await connect();

  const data = await mongo
    .db("test")
    .collection(`channel-${message.channel.id}`)
    .findOne({ itemName: args[0].toLowerCase() });

  await mongo.close();

  const quantity = data ? data.itemAmount : 0;

  await message.reply(`There are ${quantity} "${args[0]}" in the database.`);
};
