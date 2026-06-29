# create-git-alias [![](https://img.shields.io/npm/v/create-git-alias.svg)](https://www.npmjs.com/package/create-git-alias) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/create-git-alias)

## 👨🏻 CLI tool to apply some useful git aliases
This is an interactive process. You get to choose what you want

```sh
npm create git-alias [--all] [--dry-run] [--base <BASE_BRANCH>]
```

<img src="https://user-images.githubusercontent.com/516342/48844024-713ada00-eda1-11e8-9eb3-5b2d0b4bdeb8.png" width="600">

### optionals

#### `--all`
Show all choices - even ones that are identical to the ones I have

#### `--dry-run`
Print the aliases that would be configured without changing git config

#### `--base <BASE_BRANCH>`
Base branch for scripts doing rebase and deleting current branches. Defaults to "master"

## aliases

| alias | Description
| - | -
| aliases | print all git aliases
| back | Reset to previous commit
| branches | Verbose, sorted list of branches
| far | fetch from remote ["<BASE_BRANCH>" or 1st argument] and rebase
| feature | Create a branch starting with today's date
| fix | add, amend the current commit and push some fixes
| from | how many commit since <COMMIT_ID>
| get | start a repo by remote URL (1st argument) with branch ["<BASE_BRANCH>" or 2nd argument]
| l | pretty log
| last | Show diff of last N commits (defaults to 1)
| mend | commit amend with no edits
| merged | After remote merge, trash current branch and pull from ["<BASE_BRANCH>" or 1st argument]
| please | git push <this_branch> --force-with-lease
| pruner | prune aggressive
| ref | Sorted by date list of refs (branches) with the last commit message
| root | Print repository root path. Example use: "cd $(git root)"
| s | Short status with branch name
| sum | Generate a summary of pending changes (1st argument[optional] can change the base branch)
| trash | Move to ["<BASE_BRANCH>" or 1st argument] and delete current local branch
| whereami | What branch am I on?
| wip | add everything, commit with a random commit message and push to remote origin
| yolo | a commit with a random commit message from whatthecommit
| yolt | amend commit with a random commit message from whatthecommit
