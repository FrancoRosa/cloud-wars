import scores from './topscores';

const scoresAPI = (() => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  const newGameEnd = 'games/';
  const scoresEnd = 'scores/';
  const id = 'LF1opNHwPBCn678gmmYy/';

  const rank = (a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  };

  const save = async () => {
    try {
      scores.user.user = scores.user.user == null ? 'Unknown' : scores.user.user;
      scores.user.score = scores.user.score === 0 ? 1 : scores.user.score;

      const response = await fetch(url + newGameEnd + id + scoresEnd, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scores.user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const gettop = async () => {
    try {
      const response = await fetch(url + newGameEnd + id + scoresEnd, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      scores.topscores = data.result.sort(rank).splice(0, 5);
      return scores.topscores;
    } catch (error) {
      return error;
    }
  };

  return {
    save,
    gettop,
  };
})();

export default scoresAPI;
