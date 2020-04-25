import { Service } from 'typedi'
import { InMemoryCrudRepository } from '@serverless-recipes/in-memory-repository'
import { RecipeRepository } from '../recipe.repository'
import { Recipe, RecipeId } from '../recipe.model'

@Service('recipe.repository')
export class RecipeInMemoryRepository extends InMemoryCrudRepository<Recipe, RecipeId>
  implements RecipeRepository {
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
