export default class ApiConfig {
    dir = `${process.env.HOME}/tmp`
    url

    // for gitlab
    token
    // for bitbucket
    creds

    namespaces
    constructor(data) {
        Object.assign(this, data)
    }
}