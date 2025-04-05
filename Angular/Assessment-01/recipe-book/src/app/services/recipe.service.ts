import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/recipes'; // JSON Server URL
  private baseUrl = 'http://localhost:3000';

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredRecipes(category: string, country: string, search: string): Observable<any[]> {
    return this.getAllRecipes().pipe(
      map(recipes => recipes.filter(recipe => {
        const matchesCategory = category ? recipe.category === category : true;
        const matchesCountry = country ? recipe.chefDetails.contact.country === country : true;
        const matchesSearch = search ? recipe.title.toLowerCase().includes(search.toLowerCase()) : true;

        return matchesCategory && matchesCountry && matchesSearch;
      }))
    );
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  saveRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, recipeData);
  }

  updateRecipe(id: string, recipe: any) {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<{ category: string }[]> {
    return this.http.get<{ category: string }[]>(`${this.baseUrl}/categories`);
  }  

  getCountries(): Observable<{ country: string }[]> {
    return this.http.get<{ country: string }[]>(`${this.baseUrl}/countries`);
  }
}
