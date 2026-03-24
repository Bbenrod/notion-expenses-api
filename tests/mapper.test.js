const mapper = require('../src/utils/mapper');

describe('mapper', () => {
  describe('mapItem', () => {
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

  describe('mapExpenseToNotionPayload', () => {
    it('should map input to Notion payload using correct property names', () => {
      const input = {
        amount: 150,
        description: 'Food',
        paymentMethodId: 'card123',
        monthId: 'month123',
      };

      const result = mapper.mapExpenseToNotionPayload(input, 'db123');

      expect(result).toEqual({
        parent: {
          database_id: 'db123',
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
    });

    it('should handle empty description', () => {
      const input = {
        amount: 100,
        description: '',
        paymentMethodId: 'card1',
        monthId: 'month1',
      };

      const result = mapper.mapExpenseToNotionPayload(input, 'db123');

      expect(result.properties.Descripcion.title[0].text.content).toBe('');
    });
  });
});
