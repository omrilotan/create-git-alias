# Changelog

## 2.1.0

- Add "git ref" - Sorted by date list of refs (branches) with the last commit message

## 2.0.0

- [Breaking Change] Modernisation of the codebase, dropping support for old Node versions
- [Change] "git root" was supposed to change the directory to the repository root but never worked. Instead, it now prints the repository root path. If you want to change directory to the repository root, you can use "cd $(git root)".
- [Add] --dry-run option to show what would be done without actually setting the aliases

## 1.7.0

- Add "git branches" - Verbose, sorted list of branches

## 1.6.1

- Fix whatthecommit URL (now SSL only)

## 1.6.0

- Add "git last" - Show diff of last \<N> commits (defaults to 1)

## 1.5.1

- [TPYO] Fix variable interpolation in description

## 1.5.0

- Allow to specify the main branch name in relevant scripts (usually defaults to defined base or "master")

## 1.4.2

- [FIX] Fixed iteration over answers list

## 1.4.1

- Add default base branch warning

## 1.4.0

- Allow to specify a different default base branch ("master" when empty)
