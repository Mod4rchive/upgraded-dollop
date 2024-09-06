const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raids')
		.setDescription('Retrieves gtales.top/raids api')
		.addStringOption(option =>
			option.setName('element')
				.setDescription('The element of the boss')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('boss')
				.setDescription('The name of the boss')
				.setRequired(true)),
	async execute(interaction) {
		const element = interaction.options.getString('element');
		const boss = interaction.options.getString('boss');

		await interaction.reply(`boss: ${boss} element: ${element}`);
	},
};