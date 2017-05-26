import * as Gitlab from 'gitlab';
import * as fs from 'fs';
import { exec } from 'child_process';
import program from './parser';
import config from './config';
import { listProjects, cloneOrUpdateProjects } from './gitlab';
import logger from './logger';

// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function (err) {
    // handle the error safely
    logger.error("please check token, etc. ", err.message)
})


let token = program.token
let namespace = program.namespace
let dir = program.dir || config.dir
let url = program.url || config.url

const gitlab = Gitlab({
    url: url,
    token: token,
})

if (program.list) {
    listProjects(gitlab, { namespace })
} else {
    cloneOrUpdateProjects(gitlab, { dir, namespace })
}
