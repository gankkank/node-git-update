import { exec } from 'child_process';
import * as fs from 'fs';
import logger from './logger';

const getProjectInfo = (projects, config) => {
    return projects.map(project => {
        let [ns, name] = project.path_with_namespace.split("/")
        let ssh_path = project.ssh_url_to_repo
        // console.log(ns, name, ssh_path)
        if (ns === config.namespace) {
            let content = {}
            content[name] = ssh_path
            return content;
        }
        return {}
    }).reduce((pre, cur) => {
        return Object.assign({}, pre, cur)
    }, {})
}

const cloneProjects = (projects, config) => {
    Object.keys(projects).map(name => {
        if (fs.existsSync(`${config.dir}/${name}`)) {
            exec(`cd ${config.dir}/${name}; git pull`, (error, stdout, stderr) => {
                logger.debug(`[update] project ${name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        } else {
            exec(`cd ${config.dir}; git clone ${projects[name]}`, (error, stdout, stderr) => {
                logger.debug(`[create] project ${name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        }
    })
}

export const listProjects = (gitlab, config) => {
    gitlab.projects.all(projects => {
        const result = getProjectInfo(projects, config)
        console.log(`Total count: ${config.namespace}`, Object.keys(result).length)
        Object.keys(result).map(n => {
            console.log(n)
            // console.log(n, result[n])
        })
        // console.log(result)
    })

}

export const cloneOrUpdateProjects = (gitlab, config) => {

    return gitlab.projects.all(projects => {
        const result = getProjectInfo(projects, config)
        cloneProjects(result, config);
    });
}

// export default cloneOrUpdateProjects;