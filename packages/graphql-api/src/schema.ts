import { buildSchemaSync } from 'type-graphql'
import Container from 'typedi'
import { RecipeResolver } from '@serverless-recipes/recipes/adapters/recipe.graphql'

const schema = buildSchemaSync({
  resolvers: [RecipeResolver],
  container: Container
})

export default schema
