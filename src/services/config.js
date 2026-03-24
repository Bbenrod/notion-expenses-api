const notion = require('../services/notion');
const mapper = require('../utils/mapper');

const getConfig = async () => {
  const raw_months = await notion.getMonths();
  const months = raw_months.map(mapper.mapItem);

  const raw_paymentMethods = await notion.getPaymentMethods();
  const paymentMethods = raw_paymentMethods.map(mapper.mapItem);
  return {
    months,
    paymentMethods,
  };
};

module.exports = { getConfig };
