import { CommandHandler } from "rimo";
import { Service, Inject } from "typedi";
import { RecipeOutput } from "../recipe.types";
import { RecipeRepository } from "../recipe.repository";
import { Recipe, RecipeId } from "../recipe.model";
import { RecipeOutputMapper } from "../recipe.mapper";

@Service()
export class GetRecipe
  implements CommandHandler<RecipeId, RecipeOutput | undefined> {
  constructor(
    @Inject("recipe.repository") private recipeRepository: RecipeRepository,
    private recipeMapper: RecipeOutputMapper
  ) {}

  async handle(id: RecipeId): Promise<RecipeOutput | undefined> {
    const recipe:
      | Recipe
      | undefined = await this.recipeRepository.findRecipeById(id);
    return recipe && this.recipeMapper.map(recipe);
  }
}
