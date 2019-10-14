import {promisify} from 'util';
import * as ghpages from 'gh-pages';
import * as fetch from 'node-fetch';

const { GITHUB_ACTOR, GITHUB_REPOSITORY, GITHUB_TOKEN, PERSONAL_TOKEN } = process.env;
const GITHUB_API = {
    root: 'https://api.github.com',
    pageBuild: '/repos/satotake/satotake.github.io/pages/builds',
};
const BUILD_REQ_URL = GITHUB_API.root + GITHUB_API.pageBuild;

const publish = promisify(ghpages.publish);

const buildRequest = () => {
    const opt = {
        method: 'POST',
        headers: {
            Authorization: `token ${PERSONAL_TOKEN}`,
            // need scope for accessing repo.
            // e.g.) public_repo
            Accept: 'application/vnd.github.v3+json',
            // https://developer.github.com/v3/#current-version
        },
    };

    return fetch(BUILD_REQ_URL, opt)
    .then(r => {console.log(r.status); return r.text()})
    .then(console.log)
    .catch(console.error)
    ;
}

const opt = {
    repo: `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`,
    branch: 'master',
    user: {
        name: 'Github Action',
        email: 'action@github.com'
    }
};

publish('dist', opt)
.then(buildRequest)
.catch(console.error)
;
