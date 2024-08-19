import { connect } from "../controllers/mongo.js";

export default async ({ message, args }) => {
  console.log(
    `Listing database contents for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const mongo = await connect();

  const data = await mongo
    .db("test")
    .collection(`channel-${message.channel.id}`)
    .find(
      {},
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();

  await mongo.close();

  if (data.length === 0)
    return await message.channel.send("The database is empty.");

  const dataPretty = data.map((entry) => {
    return `**${entry.itemName}:** \`${entry.itemAmount}\``;
  });

  const dataPrettyString = dataPretty.join("\n");

  if (data.length > 2000)
    return await message.channel.send({
      files: [
        {
          attachment: Buffer.from(dataPrettyString),
          name: `channel-${message.channel.id}.db.json`,
        },
      ],
    });

  await message.reply(dataPrettyString);
};
