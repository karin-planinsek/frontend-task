import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api.service';
import { RecipeService } from '../recipe.service';

import { RecipeDetailsComponent } from './recipe-details.component';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;
  let recipeService: RecipeService;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all recipe data from recipe service', () => {
    recipeService = TestBed.inject(RecipeService);
    expect(recipeService.recipes).toEqual(component.recipeData);
  });

  it('should get recipe details from api service', () => {
    apiService = TestBed.inject(ApiService);
    const id = component.recipeId;
    apiService.getRecipeInfo(id)
    .subscribe(data => expect(data['id']).toEqual(id));
  });
});
