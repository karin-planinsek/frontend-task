import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  header = new HttpHeaders({'Content-Type': 'application/json'});
  API_KEY = 'd4b6211a232e4550b95379a24351ec29';

  constructor(private http: HttpClient,
              private recipeService: RecipeService)
  {}

  getRecipes() {
    return this.http.get(`
      https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.API_KEY}`, {headers: this.header});
      /*.subscribe(recipes => {
        console.log(recipes['results']);
        let listedRecipes = recipes['results'];

        /*let recipeProperties = Object.keys(listedRecipes);
        console.log(recipeProperties);

        this.recipeService.saveRecipes(listedRecipes);
      });*/
  }

  getRecipeInfo(id) {
    return this.http.get(`
    https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${this.API_KEY}`, {headers: this.header});
  }

}
