jest.mock('../src/services/config');

const request = require('supertest');
const app = require('../src/app');
const service = require('../src/services/config');

describe('GET /config', () => {
  it('should return data from service', async () => {
    service.getConfig.mockResolvedValue({
      meses: [{ id: '1', nombre: 'FEB-26' }],
      tarjetas: [{ id: '2', nombre: 'BBVA' }],
    });

    const res = await request(app).get('/config');

    expect(res.statusCode).toBe(200);

    expect(res.body.meses[0].nombre).toMatch(/^\w{3}-\d{2}$/);
    expect(res.body.tarjetas[0].nombre).toBe('BBVA');
  });
});

describe('GET /config', () => {
  it('should return error from service', async () => {
    service.getConfig.mockRejectedValue(new Error('Error'));

    const res = await request(app).get('/config');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
