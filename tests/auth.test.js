const request = require('supertest');
const app = require('../src/app');

// Mock del service para evitar errores 500
jest.mock('../src/services/config', () => ({
  getConfig: jest.fn().mockResolvedValue({
    months: [],
    paymentMethods: [],
  }),
}));

describe('auth middleware', () => {
  beforeEach(() => {
    process.env.API_KEY = 'test_key';
  });

  it('should return 401 if no api key is provided', async () => {
    const res = await request(app).get('/config');

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      error: 'Unauthorized',
    });
  });

  it('should return 401 if api key is invalid', async () => {
    const res = await request(app).get('/config').set('x-api-key', 'wrong_key');

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      error: 'Unauthorized',
    });
  });

  it('should return 200 if api key is valid', async () => {
    const res = await request(app).get('/config').set('x-api-key', 'test_key');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      months: [],
      paymentMethods: [],
    });
  });
});
