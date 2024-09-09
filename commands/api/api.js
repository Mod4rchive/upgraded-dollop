const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('api')
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
		const dictResult = await request(`https://www.gtales.top/api/raids?boss=${boss}&element=${element}`);
		const list = await dictResult.body.json();

		try {
		const answer = list[0];

		const embed = new EmbedBuilder()
			.setColor(0xEFFF00)
			.addFields({ name: 'Heroes', value: `${answer.heroes}` }, { name: 'Cartas', value: `${answer.cards}` }, { name: 'Reliquia', value: `${answer.relic}` }, { name: 'Cadena', value: `${JSON.stringify(answer.chains.P1)}` });

		
			await interaction.editReply({ embeds: [embed] });
		} catch {
			return interaction.editReply(`No results found for **${element}** and **${boss}**.`);
		}
	},
};