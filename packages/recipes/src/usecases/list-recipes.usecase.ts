import { CommandHandler } from "rimo";
import { Service, Inject } from "typedi";
import { RecipeOutput } from "../recipe.types";
import { RecipeRepository } from "../recipe.repository";
import { Recipe } from "../recipe.model";
import { RecipeOutputMapper } from "../recipe.mapper";

@Service()
export class GetRecipes implements CommandHandler<unknown, RecipeOutput[]> {
  constructor(
    @Inject("recipe.repository") private recipeRepository: RecipeRepository,
    private recipeMapper: RecipeOutputMapper
  ) {}

  async handle(): Promise<RecipeOutput[]> {
    const recipes: Recipe[] = await this.recipeRepository.findAllRecipes();
    return this.recipeMapper.map(recipes);
  }
}
