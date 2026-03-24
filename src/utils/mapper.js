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

module.exports = { mapItem };
