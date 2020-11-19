import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipeData;
  recipeInfo;

  recipeId;

  constructor(private recipeService: RecipeService,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.recipeId = this.recipeService.recipeId;
    console.log(this.recipeId);

    /*this.recipeService.recipeResults
    .subscribe(data => {
      console.log(data);
      console.log(this.recipeData);

      if (data !== null) {
        this.recipeData = data.find(x => x.id === this.recipeId);
        console.log(this.recipeData);
      }

    });*/

    this.apiService.getRecipeInfo(this.recipeId)
    .subscribe(data => {
      console.log(data);
      this.recipeInfo = data;
    });
  }

  addToFavourites() {
    let favourites = JSON.parse(localStorage.getItem('favouriteRecipes'));
    console.log(favourites);

    let alreadyStored = false;

    if (favourites !== null) {
      if (favourites.length > 1) {
        for (let favourite of favourites) {
          if (this.recipeInfo.id === favourite['id']) {
            // alert('Recipe has already been added to favourites');
            alreadyStored = true;
          }
        }

        if (alreadyStored) {
          alert('Recipe has already been added to favourites');
        } else {
          this.recipeService.storeRecipeInfo(
            this.recipeInfo.id,
            this.recipeInfo.title,
            this.recipeInfo.image,
            this.recipeInfo.instructions,
            this.recipeInfo.summary,
            this.recipeInfo.readyInMinutes,
            this.recipeInfo.servings
          );
          document.getElementById('button').innerText = 'Added!';
        }
      } else if (favourites.length <= 1) { // <= 1
        console.log(favourites[0]['id']);

        if (this.recipeInfo.id === favourites[0]['id']) {
          alert('Recipe has already been added to favourites');
        } else {
          this.recipeService.storeRecipeInfo(
            this.recipeInfo.id,
            this.recipeInfo.title,
            this.recipeInfo.image,
            this.recipeInfo.instructions,
            this.recipeInfo.summary,
            this.recipeInfo.readyInMinutes,
            this.recipeInfo.servings
          );

          document.getElementById('button').innerText = 'Added!';
        }
      }
    } else {
      this.recipeService.storeRecipeInfo(
        this.recipeInfo.id,
        this.recipeInfo.title,
        this.recipeInfo.image,
        this.recipeInfo.instructions,
        this.recipeInfo.summary,
        this.recipeInfo.readyInMinutes,
        this.recipeInfo.servings
      );

      document.getElementById('button').innerText = 'Added!';
    }
  }

}
