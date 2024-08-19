const commands = [
  ["help", "Shows this message"],
  ["ping", "Pong!"],
  ["get [item]", "Get the quantity of an item"],
  ["add [quantity] [item]", "Add a quantity of an item"],
  ["remove [quantity] [item]", "Remove a quantity of an item"],
  ["clear", "Clear the database for this channel"],
];

export default async ({ message }) =>
  await message.reply(
    `# LootTracker Available commands\n${commands
      .map(([command, description]) => `**${command}** ${description}`)
      .join("\n")}`
  );
