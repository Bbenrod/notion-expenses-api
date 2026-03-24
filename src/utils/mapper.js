const mapItem = (item) => {
  const id = item.id;

  const titleKey = Object.keys(item.properties).find(
    (key) => item.properties[key]?.type === 'title',
  );
  const value = titleKey
    ? (item.properties[titleKey]?.title?.[0]?.plain_text ?? '')
    : '';

  return { id, value };
};

const mapExpenseToNotionPayload = (input, database_id) => {
  return {
    parent: {
      database_id,
    },
    properties: {
      Nombre: {
        title: [
          {
            text: {
              content: input.description,
            },
          },
        ],
      },
      Monto: {
        number: 150,
      },
      Mes: {
        relation: [{ id: input.monthId }],
      },
      'Metodo de pago': {
        relation: [{ id: input.paymentMethodId }],
      },
    },
  };
};

module.exports = { mapItem, mapExpenseToNotionPayload };
