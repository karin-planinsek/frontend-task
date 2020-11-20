import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  header = new HttpHeaders({'Content-Type': 'application/json'});
  API_KEY = '88de97d87c084c90bb6db83951a8b806';

  constructor(private http: HttpClient)
  {}

  getRecipes() {
    return this.http.get(`
      https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.API_KEY}`, {headers: this.header});
  }

  getRecipeInfo(id) {
    return this.http.get(`
    https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${this.API_KEY}`, {headers: this.header});
  }

}
