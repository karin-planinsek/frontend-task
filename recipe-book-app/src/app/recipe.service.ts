import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeData = new BehaviorSubject<any>(null);
  recipeResults = this.recipeData.asObservable();

  recipeId;

  getRecipes(recipes) {
    this.recipeData.next(recipes);
  }

  getRecipeId(id) {
    this.recipeId = id;
    console.log(this.recipeId);
  }

}
