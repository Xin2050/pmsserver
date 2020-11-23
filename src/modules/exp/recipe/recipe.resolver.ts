import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { User } from '../../hr/user/user.entity';
import { NewRecipeInput, RecipesArgs } from './recipe.input';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';
import { NotFoundException } from '@nestjs/common';


@Resolver(Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(returns => Recipe)
  async recipe(@Arg("id") id: number) {
    const recipe = await this.recipeService.findById(id);
    if (!recipe) {
      throw new NotFoundException()
    }
    return recipe;
  }
  @Query(r=>[Recipe])
  async getAllRecipe() {
    return await this.recipeService.getAll();
  }


  // @Query(returns => [Recipe])
  // recipes(@Args() { skip, take }: RecipesArgs) {
  //   return this.recipeService.findAll({ skip, take });
  // }

  @Mutation(returns => Recipe)
  //@Authorized()
  addRecipe(
    @Arg("newRecipeData") newRecipeData: NewRecipeInput,
    //@Ctx("user") user: User,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(newRecipeData);
  }

  // @Mutation(returns => Boolean)
  // //@Authorized(Roles.Admin)
  // async removeRecipe(@Arg("id") id: string) {
  //   try {
  //     await this.recipeService.removeById(id);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }

}
