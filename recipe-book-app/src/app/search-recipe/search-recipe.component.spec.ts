import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api.service';

import { SearchRecipeComponent } from './search-recipe.component';

describe('SearchRecipeComponent', () => {
  let component: SearchRecipeComponent;
  let fixture: ComponentFixture<SearchRecipeComponent>;
  let apiService: ApiService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRecipeComponent ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create recipe app', () => {
    expect(component).toBeTruthy();
  });

  it('should receive recipes from api', () => {
    apiService = TestBed.inject(ApiService);
    let expectedData: {id: number; title: string; image: string; imageType: string};
    apiService.getRecipes()
    .subscribe(data => expect(data['results']).toEqual(expectedData));
  });
});
