const axios = require('axios');

function getProfile(username) {
  return axios
    .get('https://api.github.com/users/' + username)
    .then(user => user.data);
}

function getRepos(username) {
  return axios.get(
    'https://api.github.com/users/' + username + '/repos?&per_page=100',
  );
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repos.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  let follower = profile.followers;
  let totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
}

function handleError(err) {
  console.warn(err);
  return null;
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then(data => {
    let profile = data[0];
    let repost = data[1];

    return {
      profile,
      score: calculateScore(profile, repos),
    };
  });
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

module.exports = {
  battle: players =>
    axios.all(
      players
        .map(getUserData)
        .then(sortPlayers)
        .catch(handleError),
    ),
  fetchPopularRepos: language => {
    let encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language +
        '&sort=stars&order=desc&type=Repositories',
    );

    return axios
      .get(encodedURI)
      .then(response => {
        return response.data.items;
      })
      .catch(err => {
        return err;
      });
  },
};
