import { getScore } from '../js/savescores';


describe('savescore', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      result: [
        { user: 'Me', score: 1 },
        { user: 'Me', score: 2 },
        { user: 'Me', score: 3 },
        { user: 'Me', score: 7 },
        { user: 'Me', score: 1 },
        { user: 'Me', score: 0 },
        { user: 'Me', score: 0 },
      ],
    }),
  );

  let response = '';

  test('it should return an array of objects', async () => {
    response = await getScore();
    expect(typeof response).toBe('object');
  });

  test('it should the top 5 results', async () => {
    expect(response.length).toBe(5);
  });

  test('it should return results ordered by score', async () => {
    expect(response[0].score > response[1].score).toBe(true);
  });
});
