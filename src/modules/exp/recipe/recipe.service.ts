import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { NewRecipeInput } from './recipe.input';

@Injectable()
export class RecipeService {
  constructor(
   @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ){}

  async findById(id:number):Promise<Recipe> {
    return await this.recipeRepository.findOne(id);
  }

  async getAll():Promise<Recipe[]> {
    return await this.recipeRepository.find();
  }

  async createRecipe(newRecipeInput: NewRecipeInput): Promise<Recipe> {
    const {title, description, ingredients} = newRecipeInput;
    const recipe = this.recipeRepository.create({
      title,
      description,
      ingredients,
    })
    return await this.recipeRepository.save(recipe);
  }

}
