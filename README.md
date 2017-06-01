# README

[![Build Status](https://travis-ci.org/gankkank/node-git-update.svg?branch=master)](https://travis-ci.org/gankkank/node-git-update)

[![Code Climate](https://codeclimate.com/github/gankkank/node-git-update/badges/gpa.svg)](https://codeclimate.com/github/gankkank/node-git-update)

Install use:

`yarn global add git-update`

Or:

`npm install git-update -g`

## Run

Pre-setting: add host's public key in `~/.ssh/id_rsa.pub` to gitlab/bitbucket

Then:

`bitbucket-update -t username:password -n team1,team2,team3 -d /tmp`

`gitlab-update -t token -n namespace -d /tmp`

## Update

* v1.1.0

support clone/update bitbucket repositories; support multiple namespaces

list repositories: `./bitbucket-update.js -t username:password -n team1,team2,team3 -d /tmp -l`

## Help

Sync projects in namespace to local folders

```txt

  Usage: gitlab-update [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -t, --token [token]          Set token, Required
    -n, --namespace [namespace]  Set namespace, Required
    -u, --url [url]              Set gitlab url, Default: https://gitlab.com
    -d, --dir [dir]              Set target directory, Default: /Users/jimmy/tmp
    -l, --list                   List projects

  Examples:

  Clone/Update projects in namespace:
    $ gitlab-update -t xxxx -n xxx
  List projects in certain namespace:
    $ gitlab-update -t xxxx -n xxx -l


```