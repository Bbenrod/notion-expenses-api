jest.mock('../src/services/config');

const request = require('supertest');
const app = require('../src/app');
const service = require('../src/services/config');

describe('GET /config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return data from service', async () => {
    service.getConfig.mockResolvedValue({
      months: [{ id: '1', value: 'FEB-26' }],
      cards: [{ id: '2', value: 'BBVA' }],
    });

    const res = await request(app).get('/config');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      months: [{ id: '1', value: 'FEB-26' }],
      cards: [{ id: '2', value: 'BBVA' }],
    });

    expect(service.getConfig).toHaveBeenCalled();
  });

  it('should return error from service', async () => {
    service.getConfig.mockRejectedValue(new Error('Error'));

    const res = await request(app).get('/config');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');

    expect(service.getConfig).toHaveBeenCalled();
  });
});
