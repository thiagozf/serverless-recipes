import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Int
} from "type-graphql";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { RecipeInput } from "./recipe.types";

@Resolver(Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(() => [Recipe])
  recipes() {
    return this.recipeService.getAll();
  }

  @Query(() => Recipe, { nullable: true })
  async recipe(@Arg("recipeId") recipeId: string) {
    return this.recipeService.getOne(recipeId);
  }

  @Mutation(() => Recipe)
  async addRecipe(@Arg("recipe") recipe: RecipeInput): Promise<Recipe> {
    return this.recipeService.add(recipe);
  }

  @FieldResolver(() => Int)
  async numberInCollection(@Root() recipe: Recipe): Promise<number> {
    const index = await this.recipeService.findIndex(recipe);
    return index + 1;
  }
}
