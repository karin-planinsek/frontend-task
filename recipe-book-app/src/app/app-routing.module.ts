import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FavouriteRecipesComponent } from './favourite-recipes/favourite-recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SearchRecipeComponent } from './search-recipe/search-recipe.component';


const routes: Routes = [
  { path: '', component: SearchRecipeComponent },
  { path: 'details', component: RecipeDetailsComponent },
  { path: 'favourites', component: FavouriteRecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
