const notion = require('./notion');

const createExpense = async (expense) => {
  try {
    console.log('Creating expense:', expense);
    const result = await notion.createExpense(expense);
    return { id: result.id, success: true };
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

module.exports = { createExpense };
