import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-favourite-recipes',
  templateUrl: './favourite-recipes.component.html',
  styleUrls: ['./favourite-recipes.component.css']
})
export class FavouriteRecipesComponent implements OnInit {

  recipeId;
  favouriteRecipes = [];
  noFavouriteRecipes: boolean;

  constructor(private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.noFavouriteRecipes = false;
    /*this.recipeId = this.recipeService.recipeId;
    console.log(this.recipeId);

    this.recipeService.recipeDetails
    .subscribe(data => {
      console.log(data);
    });*/

    this.favouriteRecipes = JSON.parse(localStorage.getItem('favouriteRecipes'));
    console.log(this.favouriteRecipes);

    /*let favRecipeObject = {};
    Object.assign(favRecipeObject, this.favouriteRecipes);
    console.log(favRecipeObject);

    this.recipeService.getRecipes(favRecipeObject);*/
  }

  onClick() {
    let recipeId = document.getElementById('recipeId').innerText;
    console.log(recipeId);
    this.recipeService.getRecipeId(recipeId);
    this.router.navigate(['/details']);
  }

  removeFromFavourites(id) {
    /*let recipeId = parseInt(document.getElementById('recipeId').innerText, 10);
    console.log(recipeId);*/
    console.log(id);

    if (this.favouriteRecipes.length > 1) {
      for (let i = 0; i < this.favouriteRecipes.length; i++) {
        console.log(this.favouriteRecipes[i].id);
        if (this.favouriteRecipes[i].id === id) {

          let updatedFavourites = this.favouriteRecipes.splice(i, 1);
          console.log(updatedFavourites);
          this.recipeService.updateRecipeInfo(updatedFavourites);
        }
      }
    } else {
      this.recipeService.emptyLocalStorage();
      console.log('retrievedData', JSON.parse(localStorage.getItem('favouriteRecipes')));
      document.getElementById('card').remove();
      document.getElementById('desc').innerText = 'You have no favourite recipes yet';
      this.noFavouriteRecipes = true;
    }

  }

}
