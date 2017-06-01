import * as fs from 'fs';
import { exec } from 'child_process';
import logger from './logger';

export const cloneProjects = (repos, config) => {
    repos.map(p => {
        let clone_to_path = p.namespace ? `${config.dir}/${p.namespace}/${p.name}` : `${config.dir}/${name}`;

        if (fs.existsSync(`${clone_to_path}`)) {
            exec(`cd ${clone_to_path}; git pull`, (error, stdout, stderr) => {
                logger.debug(`[update] project ${p.namespace}/${p.name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        } else {
            exec(`cd ${config.dir}; git clone ${p.link} ${clone_to_path}`, (error, stdout, stderr) => {
                logger.debug(`[create] project ${p.namespace}/${p.name}`)
                //do whatever here
                if (error !== null) {
                    console.log(`[error]`, error)
                }
            })
        }
    })
}