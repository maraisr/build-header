const envCi = require('env-ci');
const { green, yellow, dim, magenta } = require('kleur');
const boxen = require('boxen');

export default function buildHeader(env = process.env.NODE_ENV) {
	const {
		branch = 'na',
		build: number = 'na',
		commit = 'na',
		isCi,
		name: ciName = 'local',
	} = envCi();

	const log_messages = [
		{ label: '📚 Commit:', value: commit },
		{ label: '🔧 Build:', value: number },
		{ label: '🌳 Branch:', value: branch },
		{
			label: '🎯 Target:',
			value: env || 'development',
		},
	];

	let output = [];

	const paddingEnd =
		Math.max(...log_messages.map((item) => item.label.length)) + 3;

	log_messages.forEach((message) => {
		output.push(
			dim(message.label.padEnd(paddingEnd, ' ')) + magenta(message.value)
		);
	});

	return (
		`🚀 Running on ${ciName} in a ${
			isCi ? green('CI') : yellow('local')
		} context.\n` +
		boxen(output.join('\n'), {
			align: 'left',
			borderStyle: 'round',
			padding: 1,
			borderColor: 'cyan',
		})
	);
}
