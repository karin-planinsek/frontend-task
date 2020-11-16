import { Component, OnInit } from '@angular/core';
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
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.recipeId = this.recipeService.recipeId;
    console.log(this.recipeId);

    this.recipeService.recipeResults
    .subscribe(data => {
      console.log(data);
      console.log(this.recipeData);

      if (data !== null) {
        this.recipeData = data.find(x => x.id === this.recipeId);
        console.log(this.recipeData);
      }

    });

    this.apiService.getRecipeInfo(this.recipeId)
    .subscribe(data => {
      console.log(data);
      this.recipeInfo = data;
    });
  }

}
