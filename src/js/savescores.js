import scores from './topscores';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const newGameEnd = 'games/';
const scoresEnd = 'scores/';
const id = 'LF1opNHwPBCn678gmmYy/';

export const saveScore = async () => {
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getScore = async () => {
  try {
    const response = await fetch(url + newGameEnd + id + scoresEnd, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

