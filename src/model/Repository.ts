

export default class Repository {
    link

    // team, slug, namespace
    namespace

    name
    constructor(data) {
        Object.assign(this, data)
    }
}