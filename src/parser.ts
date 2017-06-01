import * as program from 'commander';
import * as fs from 'fs';
import logger from './logger';
import ApiConfig from './model/ApiConfig';

const defaultConfig = new ApiConfig({});
program
    .version('0.0.1')
    .option('-t, --token [token]', 'Set token or username:password, Required')
    .option('-n, --namespace [namespace]', 'Set namespace, if use multiple namespaces, seperate by ",", Required')
    .option('-u, --url [url]', `Set gitlab/bitbucket url, Optional.`)
    .option('-d, --dir [dir]', `Set target directory, Default: ~/tmp`)
    .option('-l, --list', `List projects`)
    .on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('  Clone/Update projects in namespace:');
        console.log('    $ gitlab-update -t token -n namespace -d /tmp');
        console.log('    $ bitbucket-update -t username:password -n team1,team2,team3 -d /tmp')
        console.log('  List projects in certain namespace:');
        console.log('    $ gitlab-update -t token -n namespace -d /tmp -l');
        console.log('');
    })
    .parse(process.argv);


if (program.token === undefined || program.namespace === undefined) {
    logger.error(`[error] token / namespace should exist`)
    process.exit(1)
}

let dir = program.dir || defaultConfig.dir
if (!fs.existsSync(dir)) {
    logger.error(` [error] dir ${dir} should exists`)
    process.exit(1)
}

export default program