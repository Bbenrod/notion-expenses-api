jest.mock('../src/services/notion');

const service = require('../src/services/config');
const notion = require('../src/services/notion');

describe('config service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call notion and return mapped months and cards', async () => {
    // Mock de respuesta de Notion
    notion.getMonths.mockResolvedValue([{ id: 'm1', value: 'FEB-26' }]);
    notion.getCards.mockResolvedValue([{ id: 't1', value: 'BBVA' }]);

    const result = await service.getConfig();

    // Verifica llamadas
    expect(notion.getMonths).toHaveBeenCalledTimes(1);
    expect(notion.getCards).toHaveBeenCalledTimes(1);

    // Verifica resultado
    expect(result).toEqual({
      months: [{ id: 'm1', value: 'FEB-26' }],
      cards: [{ id: 't1', value: 'BBVA' }],
    });
  });
});
