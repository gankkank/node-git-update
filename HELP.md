# HELP

```txt
  Usage: gitlab-update [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -t, --token [token]          Set token or username:password, Required
    -n, --namespace [namespace]  Set namespace, if use multiple namespaces, seperate by ",", Required
    -u, --url [url]              Set gitlab/bitbucket url, Optional.
    -d, --dir [dir]              Set target directory, Default: ~/tmp
    -l, --list                   List projects

  Examples:

  Clone/Update projects in namespace:
    $ gitlab-update -t token -n namespace -d /tmp
    $ bitbucket-update -t username:password -n team1,team2,team3 -d /tmp
  List projects in certain namespace:
    $ gitlab-update -t token -n namespace -d /tmp -l
```