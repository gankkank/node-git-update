import * as program from 'commander';
import config from './config';
import * as fs from 'fs';
import logger from './logger';

program
    .version('0.0.1')
    .option('-t, --token [token]', 'Set token, Required')
    .option('-n, --namespace [namespace]', 'Set namespace, Required')
    .option('-u, --url [url]', `Set gitlab url, Default: ${config.url}`)
    .option('-d, --dir [dir]', `Set target directory, Default: ${config.dir}`)
    .option('-l, --list', `List projects`)
    .on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('  Clone/Update projects in namespace:');
        console.log('    $ gitlab-update -t xxxx -n xxx');
        console.log('  List projects in certain namespace:');
        console.log('    $ gitlab-update -t xxxx -n xxx -l');
        console.log('');
    })
    .parse(process.argv);


if (program.token === undefined || program.namespace === undefined) {
    logger.error(`[error] token / namespace should exist`)
    process.exit(1)
}

let dir = program.dir || config.dir
if (!fs.existsSync(dir)) {
    logger.error(` [error] dir ${dir} should exists`)
    process.exit(1)
}

export default program