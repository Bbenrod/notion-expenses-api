jest.mock('../src/services/notion');

const service = require('../src/services/config');
const notion = require('../src/services/notion');

describe('config service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call notion and return mapped months and payment methods', async () => {
    notion.getMonths.mockResolvedValue([
      {
        id: 'm1',
        properties: {
          Mes: {
            type: 'title',
            title: [{ plain_text: 'FEB-26' }],
          },
        },
      },
    ]);

    notion.getPaymentMethods.mockResolvedValue([
      {
        id: 't1',
        properties: {
          'Metodo de pago': {
            type: 'title',
            title: [{ plain_text: 'BBVA' }],
          },
        },
      },
    ]);

    const result = await service.getConfig();

    expect(notion.getMonths).toHaveBeenCalledTimes(1);
    expect(notion.getPaymentMethods).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      months: [{ id: 'm1', value: 'FEB-26' }],
      paymentMethods: [{ id: 't1', value: 'BBVA' }],
    });
  });
});
