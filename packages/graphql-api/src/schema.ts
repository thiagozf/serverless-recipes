import { buildSchemaSync } from 'type-graphql'
import Container from 'typedi'
import { RecipeResolver } from './recipe.resolver'

const schema = buildSchemaSync({
  resolvers: [RecipeResolver],
  container: Container
})

export default schema
