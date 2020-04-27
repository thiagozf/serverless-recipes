import { Service } from 'typedi'
import { DynamoCrudRepository } from '@serverless-recipes/dynamodb'
import { RecipeRepository } from '../recipe.repository'
import { Recipe, RecipeId } from '../recipe.model'

@Service('recipe.repository')
export class RecipeDynamoRepository extends DynamoCrudRepository<Recipe, RecipeId>
  implements RecipeRepository {
  constructor() {
    super(Recipe)
  }

  getPK({ id }) {
    return `Recipe:${id.toValue()}`
  }

  getSK() {
    return `Recipe`
  }

  getGSI_SK({ title }) {
    return `title:${title}`
  }

  async findAllRecipes(): Promise<Recipe[]> {
    return this.findAll()
  }

  async findRecipeById(id: RecipeId): Promise<Recipe> {
    return this.findById(id)
  }

  async saveRecipe(recipe: Recipe): Promise<Recipe> {
    return this.save(recipe)
  }
}
