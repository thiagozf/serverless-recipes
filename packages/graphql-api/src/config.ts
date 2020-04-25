import Container from 'typedi'
import { sampleRecipes } from './recipe.data'

Container.set({ id: 'SAMPLE_RECIPES', factory: () => sampleRecipes.slice() })
