import { Resolver, Query, Mutation, Arg, ID, FieldResolver, Root, Int } from 'type-graphql'
import { RecipeInput, RecipeOutput } from '../recipe.types'
import { CreateRecipe, GetRecipes, GetRecipe, UpdateRecipe } from '../usecases'
import { RecipeId } from '../recipe.model'

@Resolver(() => RecipeOutput)
export class RecipeResolver {
  constructor(
    private readonly createRecipeCase: CreateRecipe,
    private readonly getRecipesCase: GetRecipes,
    private readonly getRecipeCase: GetRecipe,
    private readonly updateRecipeCase: UpdateRecipe
  ) {}

  @Query(() => [RecipeOutput])
  async recipes(): Promise<RecipeOutput[]> {
    return this.getRecipesCase.handle()
  }

  @Mutation(() => RecipeOutput)
  async addRecipe(@Arg('recipe') recipe: RecipeInput): Promise<RecipeOutput> {
    return this.createRecipeCase.handle(recipe)
  }

  @Mutation(() => RecipeOutput, { nullable: true })
  async updateRecipe(
    @Arg('id', () => ID) id: string,
    @Arg('recipe') payload: RecipeInput
  ): Promise<RecipeOutput> {
    return this.updateRecipeCase.handle({ id: new RecipeId(id), payload })
  }

  @Query(() => RecipeOutput, { nullable: true })
  async recipe(@Arg('id', () => ID) id: string) {
    return this.getRecipeCase.handle(new RecipeId(id))
  }

  @FieldResolver(() => Int)
  async ingredientsCount(@Root() recipe: RecipeOutput): Promise<number> {
    return recipe.ingredients.length
  }
}
