import { connect } from "../controllers/mongo.js";

export default async ({ message, args }) => {
  console.log(
    `Removing ${args[0]} "${args[1]}" from the database for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const mongo = await connect();

  await mongo
    .db("test")
    .collection(`channel-${message.channel.id}`)
    .updateOne(
      { itemName: args[1].toLowerCase() },
      { $inc: { itemAmount: -parseInt(args[0]) } },
      { upsert: true }
    );
};
