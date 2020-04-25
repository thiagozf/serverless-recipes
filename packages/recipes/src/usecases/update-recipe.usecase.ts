import { CommandHandler } from "rimo";
import { Service, Inject } from "typedi";
import { RecipeOutput, RecipeInput } from "../recipe.types";
import { RecipeRepository } from "../recipe.repository";
import { Recipe, RecipeId } from "../recipe.model";
import { RecipeOutputMapper } from "../recipe.mapper";

export interface UpdateRecipeInput {
  id: RecipeId;
  payload: RecipeInput;
}

@Service()
export class UpdateRecipe
  implements CommandHandler<UpdateRecipeInput, RecipeOutput | undefined> {
  constructor(
    @Inject("recipe.repository") private recipeRepository: RecipeRepository,
    private recipeMapper: RecipeOutputMapper
  ) {}

  async handle({
    id,
    payload
  }: UpdateRecipeInput): Promise<RecipeOutput | undefined> {
    const recipe:
      | Recipe
      | undefined = await this.recipeRepository.findRecipeById(id);
    if (!recipe) {
      return undefined;
    }

    recipe.populate(payload);
    const updatedRecipe: Recipe = await this.recipeRepository.saveRecipe(
      recipe
    );
    return this.recipeMapper.map(updatedRecipe);
  }
}
