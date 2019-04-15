const envCi = require('env-ci');
const { green, yellow, dim, magenta } = require('kleur');

export default function buildHeader(env = process.env.NODE_ENV) {
	const {
		branch = 'null',
		build: number = 'null',
		commit = 'null',
		isCi,
		name: ciName = 'local',
	} = envCi();

	const log_messages = [
		{ label: '📚 Commit:', value: commit },
		{ label: '🔧 Build:', value: number },
		{ label: '🌳 Branch:', value: branch },
		{
			label: '🎯 Target:',
			value: env,
		},
	];

	let output = '';

	const paddingEnd =
		Math.max(...log_messages.map(item => item.label.length)) + 3;
	const maxValue = Math.max(...log_messages.map(item => item.value.length));

	output += `🚀 Running on ${ciName} in a ${
		isCi ? green('CI') : yellow('local')
	} context.\n`;

	output += dim('-'.repeat(paddingEnd + maxValue + 2)) + '\n';

	log_messages.forEach(message => {
		output += ` ${dim(message.label.padEnd(paddingEnd, ' '))}${magenta(
			message.value
		)} \n`;
	});

	output += dim('-'.repeat(paddingEnd + maxValue + 2));

	return output;
}
