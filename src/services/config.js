const notion = require('../services/notion');

const getConfig = async () => {
  const months = await notion.getMonths();
  const cards = await notion.getCards();

  return {
    months,
    cards,
  };
};

module.exports = { getConfig };
