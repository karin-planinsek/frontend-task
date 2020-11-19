import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {

  recipes;
  keyword = 'title';

  constructor(private router: Router,
              private apiService: ApiService,
              private recipeService: RecipeService)
  { }

  ngOnInit(): void {
    this.apiService.getRecipes()
    .subscribe(response => {
      this.recipes = response['results'];
      console.log(this.recipes);
      // this.recipeService.recipes = response['results'];
      this.recipeService.getRecipes(response['results']);

      // get the id of saved favourite recipe to use it to display a golden star next to it
      let favouriteRecipes = JSON.parse(localStorage.getItem('favouriteRecipes'));

      if (favouriteRecipes !== null) {
        console.log('retrievedData', favouriteRecipes);
        console.log(favouriteRecipes['id']);

        if (response !== null) {
          let recipeData = this.recipes.find(x => x.id === favouriteRecipes.id);
          console.log(recipeData);
        }
      }



    });


  }

  selectEvent(recipe) {
    console.log(recipe['id']);
    this.recipeService.getRecipeId(recipe['id']);
    this.router.navigate(['/details']);
  }

  onChangeSearch(event) {

  }

  onFocused(event) {

  }

}
