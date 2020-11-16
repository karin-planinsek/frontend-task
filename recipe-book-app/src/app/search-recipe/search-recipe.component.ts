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
    });
  }

  selectEvent(recipe) {
    console.log(recipe['id']);
  }

  onChangeSearch(event) {

  }

  onFocused(event) {

  }

}
