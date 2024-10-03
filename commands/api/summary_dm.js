const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summary_dm')
		.setDescription('Obtiene los equipos de raid para un jefe, al privado')
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
					{ name: 'Marina', value: 'marina' },
					{ name: 'Duncan', value: 'duncan' },
					{ name: 'Minotauro', value: 'minotaur' },
					{ name: 'Sombra', value: 'shadow' },
					{ name: 'Viper', value: 'viper' },
					{ name: 'Panda', value: 'panda' },
          { name: 'Gast', value: 'gast' },))

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
					{ name: 'Fuego', value: 'fire' },))
	,
	async execute(interaction) {
		const boss = interaction.options.getString('boss');
		const element = interaction.options.getString('element');
		console.log(`https://www.gtales.top/api/raids?boss=${boss}&element=${element}`);

		try {
			const dictResult = await request(`https://www.gtales.top/api/raids?boss=${boss}&element=${element}`);
			const list = await dictResult.body.json();
			var pos = 0;
			var result = "";
			for (team_key in list) {
				pos += 1;
				//console.log(list[team]);
				team = list[team_key];
				//console.log(team.heroes);
				result += "[" + pos + "] **";
				for (hero in team.heroes) {
					result += "__" + team.heroes[hero] + "__ ";
					//console.log(team.heroes[hero]);
				}
				result += "**\n";

				if (team.dmg) {
					result += "**DMG: " + team.dmg + "M** \t ";
				}

				if (team.date) {
					result += team.date
				}
				if (team.warning) {
					result += "\t ***Aviso***"
				}

				result += "\n";
				//console.log(team.chains.P1)
        if (team.chains.P1){
          result += "```";
          for (chain in team.chains.P1) {
					result += "* " + team.chains.P1[chain] + "\n";
					//console.log(result);
          }
          result += "```";
				}
				result += "\n";
        }
				
			

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
        case 'gast':
					boss_name = 'Gast'; break;
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

			const embed = new EmbedBuilder()
				.setAuthor({ name: 'gtales.top', iconURL: 'https://cdn.discordapp.com/icons/1210116249825058846/b9853ae25424e2f0c13413bbf35d3000.webp?size=4096', url: 'https://www.gtales.top/' })
				.setTitle(`**${boss_name}** **${element_name}**`)
				.setURL('https://www.gtales.top/raids')
				.setColor(0xEFFF00)
				.setDescription(result);


			await interaction.user.send({
				embeds: [embed]
			});

			await interaction.editReply("Mensaje enviado.");


		} catch {
			return interaction.editReply(`No se encontró resultado para **${boss_name}** **${element_name}**.`);
		}
	},
};