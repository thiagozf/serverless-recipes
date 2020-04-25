import { Recipe } from './recipe.model'
import { InputType, Field } from 'type-graphql'

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field()
  title: string
}
