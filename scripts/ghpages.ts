import * as ghpages from 'gh-pages';
import * as fetch from 'node-fetch';

const { GITHUB_ACTOR, GITHUB_REPOSITORY, GITHUB_TOKEN, PERSONAL_TOKEN } = process.env;
const BUILD_REQ_URL = `https://api.github.com/repos/${GITHUB_REPOSITORY}/pages/builds`;

const opt = {
    method: 'POST',
    headers: {
        Authorization: `token ${PERSONAL_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        // https://developer.github.com/v3/#current-version
    },
};


ghpages.publish('dist', {
    repo: `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`,
    branch: 'master',
    user: {
        name: 'Github Action',
        email: 'action@github.com'
    }
}, (err) => {

    if (err) {
        console.log(err);
    }

    fetch(BUILD_REQ_URL, opt)
    .then(r => r.text())
    .then(console.log)
    ;
});


