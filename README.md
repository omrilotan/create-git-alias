# create-git-alias [![](https://img.shields.io/npm/v/create-git-alias.svg)](https://www.npmjs.com/package/create-git-alias) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/create-git-alias)

## 👨🏻 CLI tool to apply some useful git aliases
This is an interactive process. You get to choose what you want

```sh
npm create git-alias
```

<img src="https://user-images.githubusercontent.com/516342/48844024-713ada00-eda1-11e8-9eb3-5b2d0b4bdeb8.png" width="600">

### options

#### `--all`
Show all choices - even ones that are identical to the ones I have

```
npm create git-alias --all
```

#### `--base <BASE_BRANCH>`
Base branch for scripts doing rebase and deleting current branches. Defaults to "master"

## aliases

| alias | Description
| - | -
| aliases | print all git aliases
| back | Reset to previous commit
| far | fetch from remote "<BASE_BRANCH>" or first argument and rebase (1st argument[optional] can change the base branch)
| feature | Create a branch starting with today's date
| fix | add, amend the current commit and push some fixes
| from | how many commit since <commit id>
| get | start a repo by remote URL with branch "${base}" or second argument (1st argument is the repositoiry, 2nd argument[optional] is the branch to use)
| l | pretty log
| mend | commit amend with no edits
| merged | After remote merge, trash current branch and pull from "<BASE_BRANCH>" (1st argument[optional] can change the base branch)
| please | git push <this_branch> --force-with-lease
| pruner | prune aggressive
| purge | remove local and remote branches (accepts many)
| root | Change directory to repository root
| s | Short status with branch name
| sum | Generate a summary of pending changes (1st argument[optional] can change the base branch)
| trash | Move to "<BASE_BRANCH>" and delete current local branch (1st argument[optional] can change the base branch)
| whereami | What branch am I on?
| wip | add everything, commit with a random commit message and push to remote origin
| yolo | a commit with a random commit message from whatthecommit
| yolt | amend commit with a random commit message from whatthecommit
