import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FavouriteRecipesComponent } from './favourite-recipes.component';

describe('FavouriteRecipesComponent', () => {
  let component: FavouriteRecipesComponent;
  let fixture: ComponentFixture<FavouriteRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteRecipesComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favourites from local storage', () => {
    expect(component.favouriteRecipes).toEqual(localStorage.getItem('favouriteRecipes'));
  });
});
