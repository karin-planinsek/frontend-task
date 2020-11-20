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
      this.recipeService.recipes = response['results'];

      // get the id of saved favourite recipe to use it to display a golden star next to it
      let favouriteRecipes = JSON.parse(localStorage.getItem('favouriteRecipes'));

      if (favouriteRecipes !== null && response !== null) {
        if (favouriteRecipes.length > 1) {
          for (let favourite of favouriteRecipes) {
            let recipeId = favourite.id;
            for (let recipe of this.recipes) {
              if (recipeId === recipe.id) {
                recipe.icon = 'assets/icon/star.png';
              }
            }
          }
        } else if (favouriteRecipes.length <= 1) {
          let recipeId = favouriteRecipes[0].id;
          for (let recipe of this.recipes) {
            if (recipeId === recipe.id) {
            recipe.icon = 'assets/icon/star.png';
            }
          }
        }
      }



    });


  }

  selectEvent(recipe) {
    console.log(recipe['id']);
    this.recipeService.getRecipeId(recipe['id']);
    this.router.navigate(['/details']);
  }

}
