import scoresAPI from '../js/scoresAPI';
import scores from '../js/topscores';


describe('scoresAPI', () => {
  describe('gettop', () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        result: [
          { user: 'Player1', score: 1 },
          { user: 'Player2', score: 2 },
          { user: 'Player4', score: 3 },
          { user: 'Player5', score: 7 },
          { user: 'Player7', score: 1 },
          { user: 'Player1', score: 0 },
          { user: 'Player1', score: 0 },
        ],
      }),
    );

    let response = '';

    test('it should return only the top 5 results', async () => {
      response = await scoresAPI.gettop();
      expect(response.length).toBe(5);
    });

    test('it should return results ordered by score', () => {
      expect(response[0].score > response[1].score).toBe(true);
    });

    test('it should use fetch only once', () => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('it should fetch the right url', () => {
      expect(fetch.mock.calls[0][0]).toEqual(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LF1opNHwPBCn678gmmYy/scores/',
      );
    });
  });

  describe('save', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        result: 'Leaderboard score created correctly.',
      }),
    );

    test('it should upload unknown if user name is null', async () => {
      scores.user.user = null;
      await scoresAPI.save();
      expect(scores.user.user).toBe('Unknown');
    });

    test('it should upload 1 if score is o', async () => {
      scores.user.score = 0;
      await scoresAPI.save();
      expect(scores.user.score).toBe(1);
    });

    test('it should use fetch only once', async () => {
      await scoresAPI.save();
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('it should fetch the right url', async () => {
      await scoresAPI.save();
      expect(fetch.mock.calls[0][0]).toEqual(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LF1opNHwPBCn678gmmYy/scores/',
      );
    });
  });
});
