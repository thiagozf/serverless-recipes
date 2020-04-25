import { CommandHandler } from "rimo";
import { Service, Inject } from "typedi";
import { Recipe } from "../recipe.model";
import { RecipeRepository } from "../recipe.repository";
import { RecipeInput, RecipeOutput } from "../recipe.types";
import { RecipeOutputMapper } from "../recipe.mapper";

@Service()
export class CreateRecipe implements CommandHandler<RecipeInput, RecipeOutput> {
  constructor(
    @Inject("recipe.repository") private recipeRepository: RecipeRepository,
    private recipeMapper: RecipeOutputMapper
  ) {}

  async handle(input: RecipeInput): Promise<RecipeOutput> {
    const recipe: Recipe = new Recipe(input);
    const saved = await this.recipeRepository.saveRecipe(recipe);
    return this.recipeMapper.map(saved);
  }
}
