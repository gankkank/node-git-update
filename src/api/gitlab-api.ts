import { exec } from 'child_process';
import * as fs from 'fs';
import logger from '../logger';
import * as Gitlab from 'gitlab';
import { cloneProjects } from '../utils';
import ApiConfig from '../model/ApiConfig';

export class GitlabApi {
    config: ApiConfig
    gitlab

    constructor(program) {
        const namespaces = program.namespace.split(",").map(s => s.trim())
        this.config = new ApiConfig({
            dir: program.dir, url: program.url || "https://gitlab.com", namespaces: namespaces, token: program.token
        })
        this.gitlab = Gitlab({
            url: this.config.url,
            token: this.config.token,
        })
        // console.log("config", config)
    }

    listRepositories(cb = null) {
        this.gitlab.projects.all(projects => {
            const repos = projects.map(project => {
                let [ns, name] = project.path_with_namespace.split("/")
                let ssh_path = project.ssh_url_to_repo
                // console.log(ns, name, ssh_path)
                if (this.config.namespaces.indexOf(ns) !== -1) {
                    return { name: name, namespace: ns, link: ssh_path }
                    // content[name] = ssh_path
                    // return content;
                }
                return {}
            }).filter(p => p['name'] !== undefined)

            if (cb) {
                cb(repos)
            } else {
                logger.debug("total projects: ", repos.length)
                repos.map(r => console.log(`${r.namespace}/${r.name}`))
            }
        })
    }

    cloneOrUpdateRepositories() {
        this.listRepositories(repos => {
            // console.log(repos)
            cloneProjects(repos, { dir: this.config.dir});
        })
    }
}