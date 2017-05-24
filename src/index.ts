import * as Gitlab from 'gitlab';
import * as fs from 'fs';
import { exec } from 'child_process';

import * as program from 'commander'

let dir = `${process.env.HOME}/tmp`
let url = "https://gitlab.com"


program
    .version('0.0.1')
    .option('-t, --token [token]', 'Set token, Required')
    .option('-n, --namespace [namespace]', 'Set namespace, Required')
    .option('-u, --url [url]', `Set gitlab url, Default: ${url}`)
    .option('-d, --dir [dir]', `Set target directory, Default: ${dir}`)
    .parse(process.argv);

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom -t xxxx -n xxx');
    console.log('    $ custom -h');
    console.log('');
});

// console.log(program)


if (program.token === undefined || program.namespace === undefined) {
    console.log(`[error] token / namespace should exist`)
    process.exit(1)
}

let token = program.token
let namespace = program.namespace
dir = program.dir || dir
url = program.url || url

if (!fs.existsSync(dir)) {
    console.log(` [error] dir ${dir} should exists`)
    process.exit(1)
}

const gitlab = Gitlab({
    url: url,
    token: token,
})

// console.log(gitlab);

const getProjectInfo = (projects) => {
    return projects.map(project => {
        let [ns, name] = project.path_with_namespace.split("/")
        let ssh_path = project.ssh_url_to_repo
        if (ns === namespace) {
            let content = {}
            content[name] = ssh_path
            return content;
        }
        return {}
    }).reduce((pre, cur) => {
        return Object.assign({}, pre, cur)
    }, {})
}

const cloneProjects = (projects) => {
    Object.keys(projects).map(name => {
        if (fs.existsSync(`${dir}/${name}`)) {
            exec(`cd ${dir}/${name}; git pull`, (error, stdout, stderr) => {
                console.log(`[update] project ${name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        } else {
            exec(`cd ${dir}; git clone ${projects[name]}`, (error, stdout, stderr) => {
                console.log(`[create] project ${name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        }
    })
}

const cloneOrUpdateProjects = () => {
    gitlab.projects.all(projects => {
        const result = getProjectInfo(projects)
        cloneProjects(result);
    });
}

export default cloneOrUpdateProjects;