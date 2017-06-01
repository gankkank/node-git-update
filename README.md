# Git Update

[![Build Status](https://travis-ci.org/gankkank/node-git-update.svg?branch=master)](https://travis-ci.org/gankkank/node-git-update)
[![Code Climate](https://codeclimate.com/github/gankkank/node-git-update/badges/gpa.svg)](https://codeclimate.com/github/gankkank/node-git-update)
[![npm version](https://badge.fury.io/js/git-update.svg)](https://badge.fury.io/js/git-update)

Install: `yarn global add git-update` Or `npm install git-update -g`

## Start

Pre-setting: add host's public key in `~/.ssh/id_rsa.pub` to gitlab/bitbucket

Then:

`bitbucket-update -t username:password -n team1,team2,team3 -d /tmp`

`gitlab-update -t token -n namespace -d /tmp`

## Updates

* v1.1.0

Support clone/update bitbucket repositories; support multiple namespaces

List repositories: `./bitbucket-update.js -t username:password -n team1,team2,team3 -d /tmp -l`

## [Help](/HELP.md)