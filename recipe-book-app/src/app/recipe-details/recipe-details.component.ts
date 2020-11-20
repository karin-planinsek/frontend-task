import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

// import {} from 'string-similarity';
import * as stringSimilarity from 'string-similarity';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  recipeData;
  recipeInfo;

  recipeId;

  similarRecipes = [];

  mySubscription;

  constructor(private recipeService: RecipeService,
              private apiService: ApiService,
              private router: Router,
              private spinner: NgxSpinnerService)
  {
    // override the route reuse strategy, so the page reinitializes when routing to same route
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
    this.recipeId = this.recipeService.recipeId;
    console.log(this.recipeId);

    this.recipeData = this.recipeService.recipes;
    console.log(this.recipeData);

    // show loading indicator for 1 second
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    // let stringSimilarity = require('string-similarity');

    this.apiService.getRecipeInfo(this.recipeId)
    .subscribe(data => {
      console.log(data);
      this.recipeInfo = data;
      console.log(this.recipeData);

      let similarities;

      // find recipes with similar titles
      for (let data of this.recipeData) {
        if (this.recipeInfo.title !== data.title) {
          similarities = stringSimilarity.compareTwoStrings(this.recipeInfo.title, data.title);
          console.log(similarities);
          if (similarities > 0.2) {
            console.log(data.title);
            this.similarRecipes.push({
              id: data.id,
              title: data.title,
              image: data.image
            });
          }
        }

      }
      console.log(this.similarRecipes);
    });

    /*this.recipeService.recipeResults
    .subscribe(data => {
      console.log(data);
      this.recipeData = data;
      console.log(this.recipeData, this.recipeInfo);

      let str = this.recipeInfo.title;
      console.log(str);
      let words = str.split('');
      console.log(words);

    });*/

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

  onClick(recipeId) {
    this.recipeService.getRecipeId(recipeId);
    this.router.navigate(['/details']);
  }

  ngOnDestroy() {
  }

}
