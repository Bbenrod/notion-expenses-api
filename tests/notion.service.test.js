jest.mock('../src/config/notion');

const notionClient = require('../src/config/notion');
const notion = require('../src/services/notion');

describe('notion service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMonths', () => {
    it('should query months database and return raw results', async () => {
      notionClient.post.mockResolvedValue({
        data: {
          results: [{ id: 'm1' }],
        },
      });

      process.env.MONTHS_DATABASE_ID = 'months_db';

      const result = await notion.getMonths();

      expect(notionClient.post).toHaveBeenCalledTimes(1);

      expect(notionClient.post).toHaveBeenCalledWith(
        '/databases/months_db/query',
        {},
      );

      expect(result).toEqual([{ id: 'm1' }]);
    });
  });

  describe('getPaymentMethods', () => {
    it('should query payment methods database and return raw results', async () => {
      notionClient.post.mockResolvedValue({
        data: {
          results: [{ id: 't1' }],
        },
      });

      process.env.PAYMENT_METHODS_DATABASE_ID = 'payment_db';

      const result = await notion.getPaymentMethods();

      expect(notionClient.post).toHaveBeenCalledTimes(1);

      expect(notionClient.post).toHaveBeenCalledWith(
        '/databases/payment_db/query',
        {},
      );

      expect(result).toEqual([{ id: 't1' }]);
    });
  });

  it('should create an expense in Notion with correct payload', async () => {
    notionClient.post.mockResolvedValue({
      data: { id: 'new-page-id' },
    });

    process.env.EXPENSES_DATABASE_ID = 'expenses_db';

    const input = {
      amount: 150,
      description: 'Food',
      paymentMethodId: 'card123',
      monthId: 'month123',
    };

    const result = await notion.createExpense(input);

    // Verifica llamada a Notion
    expect(notionClient.post).toHaveBeenCalledTimes(1);

    expect(notionClient.post).toHaveBeenCalledWith('/pages', {
      parent: {
        database_id: 'expenses_db',
      },
      properties: {
        Descripcion: {
          title: [
            {
              text: {
                content: 'Food',
              },
            },
          ],
        },
        Monto: {
          number: 150,
        },
        Mes: {
          relation: [{ id: 'month123' }],
        },
        'Metodo de pago': {
          relation: [{ id: 'card123' }],
        },
      },
    });

    // Verifica respuesta
    expect(result).toEqual({
      id: 'new-page-id',
    });
  });
});
