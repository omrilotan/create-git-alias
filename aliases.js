const WHEREAMI = 'rev-parse --abbrev-ref HEAD';
const current_branch = `$(git ${WHEREAMI})`;
const what_the_commit = 'git commit -m "$(curl -s whatthecommit.com/index.txt)"';
const repository = '$(git remote get-url origin)';

module.exports = ({ base = 'master' } = {}) => [
	{
		key: 's',
		desc: 'Short status with branch name',
		value: 'status -bs',
	},
	{
		key: 'whereami',
		desc: 'What branch am I on?',
		value: WHEREAMI,
	},
	{
		key: 'aliases',
		desc: 'print all git aliases',
		value: '!git config -l | grep alias | cut -c 7-',
	},
	{
		key: 'purge',
		desc: 'remove local and remote branches (accepts many)',
		value: '!f() { for var in "$@"; do git branch -D $var & git push origin :$var; done }; f',
	},
	{
		key: 'please',
		desc: 'git push <this_branch> --force-with-lease',
		value: `!f() { git push origin ${current_branch} --force-with-lease; }; f`,
	},
	{
		key: 'sum',
		desc: 'Generate a summary of pending changes (1st argument[optional] can change the base branch)',
		value: `!f() { git request-pull $\{1:-"${base}"} ${repository} ${current_branch}; }; f`,
	},
	{
		key: 'trash',
		desc: `Move to "${base}" and delete current local branch (1st argument[optional] can change the base branch)`,
		value: `!f() { local current_branch=${current_branch} && git checkout $\{1:-"${base}"} && git branch -D $current_branch; };f`,
	},
	{
		key: 'merged',
		desc: `After remote merge, trash current branch and pull from "${base}" (1st argument[optional] can change the base branch)`,
		value: `!f() { local current_branch=$(git ${WHEREAMI}) && git checkout $\{1:-"${base}"} && git branch -D $current_branch; git push origin :$current_branch; git pull origin $\{1:-"${base}"}; };f`,
	},
	{
		key: 'l',
		desc: 'pretty log',
		value: 'log --pretty=format:"%C(yellow)%h %Cblue%>(12)%cr %Cgreen%<(20)%aN%Cred%d %Creset%s" --graph',
	},
	{
		key: 'pruner',
		desc: 'prune aggressive',
		value: 'git gc --prune=now --aggressive',
	},
	{
		key: 'feature',
		desc: 'Create a branch starting with today\'s date',
		value: '!f() { git checkout -b $(date +%Y-%m-%d)-$(echo $@ | tr " " "-"); }; f',
	},
	{
		key: 'get',
		desc: 'start a repo by remote URL with branch "${base}" or second argument (1st argument is the repositoiry, 2nd argument[optional] is the branch to use)',
		value: `!f() { git init; git remote add origin $1; git pull origin $\{2:-"${base}"; }; f`,
	},
	{
		key: 'from',
		desc: 'how many commit since <commit id>',
		value: '!f() { git rev-list --count HEAD ^"$@"; }; f',
	},
	{
		key: 'yolo',
		desc: 'a commit with a random commit message from whatthecommit',
		value: `!f() { ${what_the_commit}; }; f`,
	},
	{
		key: 'yolt',
		desc: 'amend commit with a random commit message from whatthecommit',
		value: '!f() { git commit --amend -m "$(curl -s whatthecommit.com/index.txt)"; }; f',
	},
	{
		key: 'wip',
		desc: 'add everything, commit with a random commit message and push to remote origin',
		value: `!f() { git add . && ${what_the_commit} && git push origin ${current_branch}; }; f`,
	},
	{
		key: 'fix',
		desc: 'add, amend the current commit and push some fixes',
		value: `!f() { git add . && git commit --amend --no-edit && git push origin ${current_branch} --force-with-lease; }; f`,
	},
	{
		key: 'far',
		desc: `fetch from remote "${base}" or first argument and rebase (1st argument[optional] can change the base branch)`,
		value: `!f() { git checkout $\{1:-"${base}"} && git pull origin $\{1:-"${base}"} && git checkout - && git rebase $\{1:-"${base}"}; }; f`,
	},
	{
		key: 'back',
		desc: 'Reset to previous commit',
		value: 'reset HEAD^',
	},
	{
		key: 'mend',
		desc: 'commit amend with no edits',
		value: 'commit --amend --no-edit',
	},
	{
		key: 'root',
		desc: 'Change directory to repository root',
		value: '!f() { cd $(git rev-parse --show-toplevel); }; f'
	},
];
