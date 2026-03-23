const service = require('../services/config');

const getConfig = async (req, res) => {
  try {
    const result = await service.getConfig();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in getConfig:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

module.exports = { getConfig };
