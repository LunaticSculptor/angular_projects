import { Routes } from '@angular/router';
// import { HeaderComponent } from './pages/header/header.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
// import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
// import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: '', component: AppComponent },
    { path: 'home', component: RecipeListComponent },
    { path: 'recipe-form', component: AddRecipeComponent },
    { path: 'recipe-form/:id', component: AddRecipeComponent }, // For editing
    { path: 'recipe-details', component: RecipeListComponent },
    { path: 'recipe/:id', component: RecipeDetailsComponent },
    { path: '**', component: NotFoundComponent }
];
