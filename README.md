# README

Install use:

`yarn global add gitlab-update`

Or:

`npm install gitlab-update -g`

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