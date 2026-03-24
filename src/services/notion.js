require('dotenv').config();
const notionClient = require('../config/notion');
const mapper = require('../utils/mapper');

const getMonths = async () => {
  const response = await notionClient.post(
    `/databases/${process.env.MONTHS_DATABASE_ID}/query`,
    {},
  );
  return response.data.results;
};

const getPaymentMethods = async () => {
  const response = await notionClient.post(
    `/databases/${process.env.PAYMENT_METHODS_DATABASE_ID}/query`,
    {},
  );
  return response.data.results;
};

const createExpense = async (input) => {
  const payload = mapper.mapExpenseToNotionPayload(
    input,
    process.env.EXPENSES_DATABASE_ID,
  );
  const response = await notionClient.post('/pages', payload);
  return { id: response.data.id };
};

module.exports = { getMonths, getPaymentMethods, createExpense };
