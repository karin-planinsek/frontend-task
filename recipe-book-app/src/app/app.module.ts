import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FavouriteRecipesComponent } from './favourite-recipes/favourite-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRecipeComponent,
    RecipeDetailsComponent,
    FavouriteRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
