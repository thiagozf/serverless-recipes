import { Recipe } from './recipe.model'

export const sampleRecipes = [
  createRecipe({
    id: '1',
    title: 'Recipe one'
  }),
  createRecipe({
    id: '2',
    title: 'Recipe two'
  }),
  createRecipe({
    id: '3',
    title: 'Recipe three'
  })
]

function createRecipe(recipeData: Partial<Recipe>): Recipe {
  const recipe = new Recipe()
  return Object.assign(recipe, recipeData)
}
