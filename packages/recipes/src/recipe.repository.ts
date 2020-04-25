import { Recipe, RecipeId } from './recipe.model'

export interface RecipeRepository {
  findAllRecipes(): Promise<Recipe[]>
  findRecipeById(id: RecipeId): Promise<Recipe | undefined>
  saveRecipe(recipe: Recipe): Promise<Recipe>
}
