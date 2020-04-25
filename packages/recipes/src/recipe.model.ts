import { AggregateRoot, EntityId } from 'rimo'

export class RecipeId extends EntityId {}

export interface RecipeProps {
  title: string
  description?: string
  ingredients: string[]
}

export class Recipe extends AggregateRoot<RecipeProps> {
  get description() {
    return this.props.description
  }

  get title() {
    return this.props.title
  }

  get ingredients() {
    return [...this.props.ingredients]
  }
}
