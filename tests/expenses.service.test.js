jest.mock('../src/services/notion');

const service = require('../src/services/expenses');
const notion = require('../src/services/notion');

describe('expenses service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call notion.createExpense and return success with id', async () => {
    // Mock de respuesta de Notion
    notion.createExpense.mockResolvedValue({
      id: 'notion123',
    });

    const input = {
      amount: 150,
      description: 'Food',
      paymentMethodId: 'abc123',
      monthId: 'feb26',
    };

    const result = await service.createExpense(input);

    // Verifica que se llamó a Notion
    expect(notion.createExpense).toHaveBeenCalledTimes(1);
    expect(notion.createExpense).toHaveBeenCalledWith(input);

    // Verifica respuesta del service
    expect(result).toEqual({
      success: true,
      id: 'notion123',
    });
  });

  it('should throw if notion fails', async () => {
    notion.createExpense.mockRejectedValue(new Error('fail'));
    await expect(service.createExpense({})).rejects.toThrow();
  });
});
