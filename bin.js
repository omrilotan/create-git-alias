#!/usr/bin/env node

import inquirer from 'inquirer';
import { parseArgs } from 'node:util';
import { execute } from "async-execute";
import chalk from 'chalk';
import { aliases } from './aliases.js';

const { prompt } = inquirer;
const { values } = parseArgs({
	args: process.argv.slice(2),
	allowPositionals: true,
	strict: false,
	options: {
		all: { type: 'boolean', short: 'a' },
		base: { type: 'string', short: 'b' },
		help: { type: 'boolean', short: 'h' },
		'dry-run': { type: 'boolean', short: 'd' },
		'show-all': { type: 'boolean' },
	},
});

const base = values.base;
const help = Boolean(values.help);
const dryRun = Boolean(values['dry-run']);
const showAll = Boolean(values.all || values['show-all']);

app()
	.then((message) => {
		if (message) {
			console.log(message);
		}
	})
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

async function app() {
	if (help) {
		return `
npm create git-alias [--base <BASE_BRANCH>] [--all] [--help]
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  --all, -a
    Show all choices - even ones that are identical to the ones I have

	--dry-run, -d
		Print the aliases that would be configured without changing git config

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
				name: `${chalk.yellow.bold(key)}: ${desc}`,
				value: [key, value],
				checked: false,
				disabled,
			}),
		);

	const message = ['Which git aliases would you like me to set for you?'];
	base === undefined && message.push(chalk.dim(' * We have the default base branch set as "master". To use a different branch use --base option'));
	hazard && message.push(chalk.dim('[☠️ ] marks an alias you have with a different value'));
	match && message.push(chalk.dim('[🎀️ ] marks an alias you have with the same value'));
	message.push('\t');

	const { selected } = await prompt(
		[
			{
				name: 'selected',
				message: message.join('\n'),
				type: 'checkbox',
				pageSize: '20',
				choices,
			},
		]
	);

	const clone = [...selected];

	while (selected.length) {
		const [key, value] = selected.shift();
		if (dryRun) {
			console.log(chalk.blue(`[Dry Run]`) + chalk.yellow.bold(key) + ': ' + value);
			continue;
		}
		await execute(`git config --global alias.${key} '${value}'`);
	}

	switch (clone.length) {
		case 0:
			return 'I\'ve set up no aliases for you today 😕';
		case 1:
			return `I've set up the alias "${chalk.bold(clone[0][0])}" for you 😉`;
		default:
			return `I've set up these aliases for you: ${clone.map(([key]) => `"${chalk.bold(key)}"`).join(', ')} 😃`;
	}
}
