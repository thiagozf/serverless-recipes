const base = require('../../jest.config.base')

module.exports = {
  ...base({ name: 'dynamodb', path: __dirname })
}
