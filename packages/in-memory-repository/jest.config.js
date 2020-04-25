const base = require('../../jest.config.base')

module.exports = {
  ...base({ name: 'in-memory-repository', path: __dirname })
}
