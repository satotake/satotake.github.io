import * as ghpages from 'gh-pages';
import * as fetch from 'node-fetch';

const { GITHUB_ACTOR, GITHUB_REPOSITORY, GITHUB_TOKEN, PERSONAL_TOKEN } = process.env;

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
        return;
    }
});


