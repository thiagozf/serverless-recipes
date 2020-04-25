import { Recipe } from './recipe.model'
import { RecipeOutput } from './recipe.types'
import { isArray } from 'util'
import { Service } from 'typedi'

@Service()
export class RecipeOutputMapper {
  public map(recipe: Recipe): RecipeOutput
  public map(recipe: Recipe[]): RecipeOutput[]
  public map(recipe: Recipe | Recipe[]): RecipeOutput | RecipeOutput[] {
    return isArray(recipe) ? recipe.map(this._map) : this._map(recipe)
  }

  private _map(recipe: Recipe): RecipeOutput {
    const output = new RecipeOutput()
    output.id = recipe.id.toValue() as string
    output.title = recipe.title
    output.ingredients = recipe.ingredients
    output.description = recipe.description
    return output
  }
}
