const mapper = require('../src/utils/mapper');

describe('mapper', () => {
  it('should map a Notion page to { id, value } using the title property', () => {
    const notionItem = {
      id: 'abc123',
      properties: {
        Mes: {
          type: 'title',
          title: [
            {
              plain_text: 'Feb-26',
            },
          ],
        },
      },
    };

    const result = mapper.mapItem(notionItem);

    expect(result).toEqual({
      id: 'abc123',
      value: 'Feb-26',
    });
  });

  it('should work regardless of the title property name', () => {
    const notionItem = {
      id: 'xyz789',
      properties: {
        'Metodo de pago': {
          type: 'title',
          title: [
            {
              plain_text: 'BBVA',
            },
          ],
        },
      },
    };

    const result = mapper.mapItem(notionItem);

    expect(result).toEqual({
      id: 'xyz789',
      value: 'BBVA',
    });
  });

  it('should return empty value if title is missing', () => {
    const notionItem = {
      id: 'no-title',
      properties: {},
    };

    const result = mapper.mapItem(notionItem);

    expect(result).toEqual({
      id: 'no-title',
      value: '',
    });
  });
});
