#!/usr/bin/env node

process.on('unhandledRejection', console.error);

const { prompt } = require('inquirer');
const parse = require('yargs-parser');
const execute = require('async-execute');
require('colors');
const aliases = require('./aliases');

const OPTION_SHOW_ALL = ['all', 'show-all'];
const [, , ...argv] = process.argv;

const {
	base,
	help,
	showAll
} = parse(argv, {
	alias: {
		showAll: [ 'all', 'a' ],
		base: [ 'base', 'b' ],
		help: [ 'help', 'h' ]
	}
});

app().then(console.log);

async function app() {
	if (help) {
		return `
npm create git-alias [--base <BASE_BRANCH>] [--all] [--help]
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  --all, -a
    Show all choices - even ones that are identical to the ones I have

  --base <BASE_BRANCH>, -b <BASE_BRANCH>
    Base branch for scripts doing rebase and deleting current branches. Defaults to "master"

  --help, -h
    Show this help message
`;
	}

	let match = false;
	let hazard = false;
	const bulk = await execute('git config -l | grep alias | cut -c 7-');
	const existing = bulk
		.split('\n')
		.filter(Boolean)
		.reduce(
			(accumulator, line) => {
				const [key, ...value] = line.split('=');

				return Object.assign(accumulator, {[key]: value.join('=')});
			},
			{},
		);

	const list = aliases({ base })

		// Filter out existing and identical
		.filter(
			({key, value}) => showAll || existing[key] !== value,
		)

		// Warn about existing but different
		.map(
			({key, desc, value, disabled = false}) => {
				if (existing[key] === value) {
					match = true;
					disabled = true;
					desc = `[🎀 ] ${desc}`;
				} else if (existing[key]) {
					hazard = true;
					desc = `[☠️ ] ${desc}`;
				}

				return {key, desc, value, disabled};
			},
		)
	;

	if (!list.length) {
		return 'We\'re a perfect match 😍! All of our aliases are identical';
	}

	const choices = list
		.map(
			({key, desc, value, disabled}) => ({
				name: `${key.yellow.bold}: ${desc}`,
				value: [key, value],
				checked: false,
				disabled,
			}),
		);

	const message = ['Which git aliases would you like me to set for you?'];
	base === undefined && message.push(` * We have the default base branch set as "master". To use a different branch use --base option`.dim);
	hazard && message.push('[☠️ ] marks an alias you have with a different value'.dim);
	match && message.push('[🎀️ ] marks an alias you have with the same value'.dim);
	message.push('\t');

	const answers = await prompt(
		[
			{
				name: 'aliases',
				message: message.join('\n'),
				type: 'checkbox',
				pageSize: '20',
				choices,
			},
		]
	);

	const selected = [...answers.list];

	while (answers.list.length) {
		const [key, value] = answers.list.shift();
		await execute(`git config --global alias.${key} '${value}'`);
	}

	switch (selected.length) {
		case 0:
			return 'I\'ve set up no aliases for you today 😕';
		case 1:
			return `I've set up the alias "${selected[0][0].bold}" for you 😉`;
		default:
			return `I've set up these aliases for you: ${selected.map(([key]) => `"${key.bold}"`).join(', ')} 😃`;
	}
}
