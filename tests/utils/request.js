const request = require('supertest');
const app = require('../../src/app');

const withAuth = (method, url) => {
  return request(app)
    [method](url)
    .set('x-api-key', process.env.API_KEY || 'test_key');
};

module.exports = { withAuth };
