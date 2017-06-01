import axios from 'axios'
import * as fs from 'fs';
import { exec } from 'child_process';
import Repository from '../model/Repository';
import logger from '../logger';
import { cloneProjects } from '../utils';
import ApiConfig from '../model/ApiConfig';

const tansformData = (data, namespace): Repository[] => {
    return data.values.map(repo => {
        // select ssh link rather than https
        const link = repo.links.clone.filter(l => l.name === "ssh")
        return new Repository({ link: link[0].href, name: repo.name, namespace: namespace })
    })
}

const getReposInNamespaces = async (config: { namespaces: string[], creds, url }) => {
    const links = await Promise.all(config.namespaces.map(t => {
        return axios({
            url: `${config.url}/2.0/repositories/${t}?pagelen=40`, auth: config.creds, method: "get"
        }).then(d => tansformData(d.data, t))
    }))
    // console.log(links)
    return links.reduce((pre, cur) => {
        return pre.concat(cur)
        // return pre;
    }, [])
}


export default class BitBucketApi {
    config: ApiConfig
    constructor(program) {
        const token = program.token.split(":")
        const credentials = { username: token[0], password: token[1] }
        const namespaces = program.namespace.split(",").map(s => s.trim())
        this.config = new ApiConfig({
            dir: program.dir, url: program.url || "https://api.bitbucket.org", namespaces: namespaces, creds: credentials
        })
    }

    listRepositories() {
        getReposInNamespaces(this.config).then(repos => {
            logger.debug("total projects: ", repos.length)
            repos.map(r => console.log(`${r.namespace}/${r.name}`))
        })
    }
    cloneOrUpdateRepositories() {
        getReposInNamespaces(this.config).then(repos => {
            logger.debug("total projects: ", repos.length)
            cloneProjects(repos, { dir: this.config.dir })
        })
    }
}