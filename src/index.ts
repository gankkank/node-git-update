import * as fs from 'fs';
import { exec } from 'child_process';
import program from './parser';
import logger from './logger';
import BitBucketApi from './api/bitbucket-api';
import ApiConfig from './model/ApiConfig';
import { GitlabApi } from './api/gitlab-api';

// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function (err) {
    // handle the error safely
    logger.error("please check token, etc. ", err.message)
})

const runGitlab = () => {
    const api = new GitlabApi(program);
    if (program.list) {
        api.listRepositories()
    } else {
        api.cloneOrUpdateRepositories()
    }
}

const runBitbucket = () => {
    const api = new BitBucketApi(program);

    if (program.list) {
        api.listRepositories()
    } else {
        api.cloneOrUpdateRepositories();
    }
}

const run = (repoType) => {
    if (repoType === "bitbucket") {
        return runBitbucket()
    }
    if (repoType === "gitlab") {
        return runGitlab()
    }
    logger.error("don't support repotType : " + repoType)
}

export default run