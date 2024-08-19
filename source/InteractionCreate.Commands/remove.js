import { SlashCommandBuilder } from "@discordjs/builders";
import incrementItem from "../helpers/items/increment.js";

export default {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove a quantity of an item")
    .addStringOption((option) =>
      option
        .setName("item")
        .setDescription("The item to remove from the quantity of")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("quantity")
        .setDescription("The quantity to remove")
        .setRequired(true)
    ),
  async execute({ interaction }) {
    const itemName = interaction.options.getString("item");
    const itemAmount = interaction.options.getInteger("quantity");

    console.log(
      `Removing ${itemAmount} "${itemName}" from the database for channel ${interaction.channel.name} (${interaction.channel.id}) in guild ${interaction.guild.name} (${interaction.guild.id}).`
    );

    const newAmount = await incrementItem({
      channelId: interaction.channel.id,
      itemName,
      itemAmount: -itemAmount,
    });

    await interaction.reply(
      `Changed the quantity of **${itemName}** from \`${
        newAmount + itemAmount
      }\` to \`${newAmount}\`.`
    );
  },
};
