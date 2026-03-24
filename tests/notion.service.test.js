jest.mock('../src/config/notion');

const notionClient = require('../src/config/notion');
const notion = require('../src/services/notion');

describe('notion service - createExpense', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an expense with Notion property names', async () => {
    notionClient.post.mockResolvedValue({
      data: { id: 'new-page-id' },
    });

    process.env.EXPENSES_DATABASE_ID = 'db_expenses';

    const input = {
      amount: 150,
      description: 'Food',
      cardId: 'card123',
      monthId: 'month123',
    };

    const result = await notion.createExpense(input);

    expect(notionClient.post).toHaveBeenCalledTimes(1);

    expect(notionClient.post).toHaveBeenCalledWith(
      `/pages`,
      expect.objectContaining({
        parent: {
          database_id: 'db_expenses',
        },
        properties: {
          // Nombre (title)
          Nombre: {
            title: [
              {
                text: {
                  content: 'Food',
                },
              },
            ],
          },

          // Monto (number)
          Monto: {
            number: 150,
          },

          // Relación con Mes
          Mes: {
            relation: [{ id: 'month123' }],
          },

          // Relación con Metodo de pago
          'Metodo de pago': {
            relation: [{ id: 'card123' }],
          },
        },
      }),
    );

    expect(result).toEqual({
      id: 'new-page-id',
    });
  });
});
