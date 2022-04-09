import supertest from 'supertest';
import imageAPI from '../index';
const requestServer = supertest(imageAPI);

describe('Test server initiation', () => {
  it('gets the root API endpoint', async () => {
    const response = await requestServer.get('/');
    expect(response.status).toBe(200);
  });
  it('gets the /routes endpoint', async () => {
    const response = await requestServer.get('/resizeImg');
    expect(response.status).toBe(200);
  });
});
