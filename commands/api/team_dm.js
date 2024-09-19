const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team_dm')
		.setDescription('Obtiene la build de un equipo según /summary, al privado')
		.addStringOption(option =>
			option.setName('boss')
				.setDescription('Nombre del boss')
				.setRequired(true)
				.addChoices(
					{ name: 'Hada', value: 'fairy' },
					{ name: 'Elphaba', value: 'elphaba' },
					{ name: 'Garam', value: 'garam' },
					{ name: 'Goblin', value: 'goblin' },
					{ name: 'Gusano', value: 'worm' },
					{ name: 'Demonio', value: 'demon' },
					{ name: 'Erina', value: 'erina' },
					{ name: 'Segador', value: 'harvester' },
					{ name: 'Caballero', value: 'knight' },
					{ name: 'Director', value: 'director' },
					{ name: 'Terrorista', value: 'terrorist' },
					{ name: 'Slime', value: 'slime' },
					{ name: 'Marina', value: 'panda' },
					{ name: 'Garam', value: 'marina' },
					{ name: 'Duncan', value: 'duncan' },
					{ name: 'Minotauro', value: 'garam' },
					{ name: 'Sombra', value: 'shadow' },
					{ name: 'Viper', value: 'viper' }))

		.addStringOption(option =>
			option.setName('element')
				.setDescription('Elemento del boss')
				.setRequired(true)
				.addChoices(
					{ name: 'Oscuro', value: 'dark' },
					{ name: 'Luz', value: 'light' },
					{ name: 'Basico', value: 'basic' },
					{ name: 'Tierra', value: 'earth' },
					{ name: 'Agua', value: 'water' },
					{ name: 'Fuego', value: 'fire' }))

		.addIntegerOption(option =>
			option.setName('position')
				.setDescription('Numero del equipo en /summary')
				.setRequired(true))
	,
	async execute(interaction) {
		const boss = interaction.options.getString('boss');
		const element = interaction.options.getString('element');
		const position = interaction.options.getInteger('position');
		console.log(`https://www.gtales.top/api/raids?boss=${boss}&element=${element}`);
		const dictResult = await request(`https://www.gtales.top/api/raids?boss=${boss}&element=${element}`);
		const list = await dictResult.body.json();

		const current = position - 1;

		//get name tipifyed
		var boss_name = "";
		switch (boss) {
			case 'fairy':
				boss_name = 'Hada'; break;
			case 'elphaba':
				boss_name = 'Elphaba'; break;
			case 'garam':
				boss_name = 'Garam'; break;
			case 'goblin':
				boss_name = 'Goblin'; break;
			case 'worm':
				boss_name = 'Gusano'; break;
			case 'demon':
				boss_name = 'Demonio'; break;
			case 'erina':
				boss_name = 'Erina'; break;
			case 'harvester':
				boss_name = 'Segador'; break;
			case 'knight':
				boss_name = 'Caballero'; break;
			case 'director':
				boss_name = 'Director'; break;
			case 'terrorist':
				boss_name = 'Terrorista'; break;
			case 'slime':
				boss_name = 'Slime'; break;
			case 'marina':
				boss_name = 'Marina'; break;
			case 'garam':
				boss_name = 'Garam'; break;
			case 'duncan':
				boss_name = 'Duncan'; break;
			case 'minotaur':
				boss_name = 'Minotauro'; break;
			case 'shadow':
				boss_name = 'Sombra'; break;
			case 'viper':
				boss_name = 'Viper'; break;
			case 'panda':
				boss_name = 'Panda'; break;
		}

		var element_name = "";
		switch (element) {
			case 'dark':
				element_name = 'Oscuro'; break;
			case 'light':
				element_name = 'Luz'; break;
			case 'basic':
				element_name = 'Basico'; break;
			case 'earth':
				element_name = 'Tierra'; break;
			case 'water':
				element_name = 'Agua'; break;
			case 'fire':
				element_name = 'Fuego'; break;
		}



		try {
			const answer = list[current];

			var chains = "";
			for (chain in answer.chains.P1) {
				chains += answer.chains.P1[chain] + "\n"
			}


			const embed = new EmbedBuilder()
				.setAuthor({ name: 'gtales.top', iconURL: 'https://cdn.discordapp.com/icons/1210116249825058846/b9853ae25424e2f0c13413bbf35d3000.webp?size=4096', url: 'https://www.gtales.top/' })
				.setTitle(`**[${position}]****${boss_name}** **${element_name}**`)
				.setURL('https://www.gtales.top/raids')
				.setColor(0xEFFF00)
				.setDescription(`${answer.heroes[0] + " " + answer.heroes[1] + " " + answer.heroes[2] + " " + answer.heroes[3]}`)
				.addFields(
					{ name: 'Cartas', value: `${answer.cards[0] + " / " + answer.cards[1] + " / " + answer.cards[2] + " / " + answer.cards[3]}` },
					{ name: 'Accesorios', value: `${answer.access[0] + " / " + answer.access[1] + " / " + answer.access[2] + " / " + answer.access[3]}`, inline: true },
					{ name: 'Reliquia', value: `${answer.relic}`, inline: true },
					{ name: 'Cadena', value: chains });

			if (answer.videoP1) {
				embed.addFields({ name: 'Video', value: `${answer.videoP1}`, inline: true },)
			}

			if (answer.creator) {
				embed.addFields({ name: 'Creador', value: `${answer.creator}`, inline: true })
			}

			if (answer.warning) {
				embed.addFields({ name: 'Aviso', value: `${answer.warning}` })
			}

			await interaction.user.send({
				embeds: [embed]
			});

			await interaction.editReply("Mensaje enviado.");


		} catch {
			return interaction.editReply(`No se encontró resultado para **${boss_name}** **${element_name}** en la posición **${position}**.`);
		}
	},
};