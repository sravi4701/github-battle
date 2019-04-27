const axios = require('axios');

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}`).then(user => {
        return user.data;
    });
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`).then()
}

function getStarCount(repos) {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0)
}

function sortPlayers(players) {
    return players.sort((a, b) => {
        return b.score - a.score;
    });
}

function getScore(profile, repos) {
    const followers = profile.followers;
    const starCount = getStarCount(repos);
    return followers * 3 + starCount;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(responseData => {
        const profile = responseData[0];
        const repos = responseData[1];
        const score = getScore(profile, repos);
        return {
            profile,
            score
        }
    });
}

function handleErrors(error) {
    console.warn(error);
    return null;
}

module.exports = {
    fetchPopularRepose(language) {
        const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'
        + language + '&sort=start&order=desc&type=Repositories');

        return axios.get(encodedURI).then((response) => {
            return response.data.items;
        });
    },
    battle(players) {
        return axios.all(players.map(getUserData) )
        .then(sortPlayers)
        .then(players => {
            return players;
        })
        .catch(handleErrors);
    }
}