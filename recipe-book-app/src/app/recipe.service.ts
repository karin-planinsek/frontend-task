import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeData = new BehaviorSubject<any>(null);
  recipeResults = this.recipeData.asObservable();

  recipeInfo = new BehaviorSubject<any>(null);
  recipeDetails = this.recipeInfo.asObservable();

  recipeId;

  recipe: Array<{id: number, title: string, image: string, instructions: string, summary: string, prepTime: number, servings: number}> = [];

  getRecipes(recipes) {
    console.log(recipes);
    this.recipeData.next(recipes);
  }

  getRecipeDetails(recipeInfo) {
    this.recipeInfo.next(recipeInfo);
  }

  storeRecipeInfo(
    recipeId: number, recipeTitle: string, recipeImage: string, desc: string, sum: string, time: number, numberOfServings: number)
    {
    /*this.recipe.push({
      id: recipeId,
      title: recipeTitle, image: recipeImage, instructions: desc, summary: recipeSummary, prepTime: time, servings: numberServings
    });*/

    let favouriteRecipes = [];
    favouriteRecipes = JSON.parse(localStorage.getItem('favouriteRecipes'));

    if (favouriteRecipes !== null) {
      favouriteRecipes.push({
        id: recipeId,
        title: recipeTitle, image: recipeImage, instructions: desc, summary: sum, prepTime: time, servings: numberOfServings
      });
      localStorage.setItem('favouriteRecipes', JSON.stringify(favouriteRecipes));
      console.log('retrievedData', JSON.parse(localStorage.getItem('favouriteRecipes')));
    } else {
      let recipes = [];
      recipes.push({
        id: recipeId,
        title: recipeTitle, image: recipeImage, instructions: desc, summary: sum, prepTime: time, servings: numberOfServings
      });
      localStorage.setItem('favouriteRecipes', JSON.stringify(recipes));
      console.log('retrievedData', JSON.parse(localStorage.getItem('favouriteRecipes')));
    }
  }

  updateRecipeInfo(updatedRecipe) {

    localStorage.setItem('favouriteRecipes', JSON.stringify(updatedRecipe));

    let favouriteRecipes = localStorage.getItem('favouriteRecipes');
    console.log('retrievedData', JSON.parse(favouriteRecipes));
  }

  emptyLocalStorage() {
    localStorage.clear();
  }

  getRecipeId(id) {
    this.recipeId = id;
    console.log(this.recipeId);
  }

}
