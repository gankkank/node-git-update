import * as program from 'commander';
import config from './config';
import * as fs from 'fs';

program
    .version('0.0.1')
    .option('-t, --token [token]', 'Set token, Required')
    .option('-n, --namespace [namespace]', 'Set namespace, Required')
    .option('-u, --url [url]', `Set gitlab url, Default: ${config.url}`)
    .option('-d, --dir [dir]', `Set target directory, Default: ${config.dir}`)
    .option('-l, --list', `List projects`)
    .parse(process.argv);

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('  Clone/Update projects in namespace:');
    console.log('    $ custom -t xxxx -n xxx');
    console.log('  List projects in certain namespace:');
    console.log('    $ custom -t xxxx -n xxx -l');
    console.log('');
});


if (program.token === undefined || program.namespace === undefined) {
    console.log(`[error] token / namespace should exist`)
    process.exit(1)
}

let dir = program.dir || config.dir
if (!fs.existsSync(dir)) {
    console.log(` [error] dir ${dir} should exists`)
    process.exit(1)
}

export default program