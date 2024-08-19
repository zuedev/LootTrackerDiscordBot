import { connect } from "../controllers/mongo.js";

export default async ({ message, args }) => {
  console.log(
    `Adding ${args[0]} "${args[1]}" to the database for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const mongo = await connect();

  await mongo
    .db("test")
    .collection(`channel-${message.channel.id}`)
    .updateOne(
      { itemName: args[1].toLowerCase() },
      { $inc: { itemAmount: parseInt(args[0]) } },
      { upsert: true }
    );

  await mongo.close();

  await message.react("✅");
};
