import { PermissionFlagsBits } from "discord.js";
import { connect } from "../controllers/mongo.js";

export default async ({ message, args }) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
    return message.reply("You do not have permission to use this command.");

  console.log(
    `Clearing the database for channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`
  );

  const mongo = await connect();

  const data = await mongo
    .db("test")
    .collection(`channel-${message.channel.id}`)
    .deleteMany({});

  await mongo.close();

  await message.reply(
    `Cleared the database for this channel. Deleted \`${data.deletedCount}\` entries.`
  );
};
