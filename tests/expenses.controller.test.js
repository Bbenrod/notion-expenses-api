jest.mock('../src/services/expenses');

const request = require('supertest');
const app = require('../src/app');
const service = require('../src/services/expenses');
const { withAuth } = require('./utils/request');

describe('POST /expenses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an expense and return 201', async () => {
    service.createExpense.mockResolvedValue({ success: true });

    const payload = {
      amount: 150,
      description: 'Food',
      paymentMethodId: 'abc123',
      monthId: 'feb26',
    };

    const res = await withAuth('post', '/expenses').send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true });

    expect(service.createExpense).toHaveBeenCalledTimes(1);
    expect(service.createExpense).toHaveBeenCalledWith(payload);
  });

  it('should return 500 on error', async () => {
    service.createExpense.mockRejectedValue(new Error('Something went wrong'));

    const payload = {
      amount: 150,
      description: 'Food',
      paymentMethodId: 'abc123',
      monthId: 'feb26',
    };

    const res = await withAuth('post', '/expenses').send(payload);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });

    expect(service.createExpense).toHaveBeenCalledTimes(1);
    expect(service.createExpense).toHaveBeenCalledWith(payload);
  });
});
