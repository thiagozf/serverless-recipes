import { ID, InputType, Field, ObjectType } from 'type-graphql'
import { Recipe as RecipeModel } from './recipe.model'

@InputType()
export class RecipeInput implements Partial<RecipeModel> {
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => [String])
  ingredients!: string[]

  @Field(() => String)
  title!: string
}

@ObjectType('Recipe')
export class RecipeOutput {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => [String])
  ingredients!: string[]
}
