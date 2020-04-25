import { handler } from '../src/index'

describe('GraphQL API', () => {
  it('should define a lambda handler', () => {
    expect(handler).toBeDefined()
  })
})
