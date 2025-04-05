import { Component, inject, signal, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, ReactiveFormsModule], // Added ReactiveFormsModule
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private fb = inject(FormBuilder); // Injected FormBuilder

  recipes = signal<any[]>([]); // Signal to store recipes
  filterForm!: FormGroup; // Reactive Form for filtering
  categories = signal<string[]>([]); // Signal to store categories
  countries = signal<string[]>([]); // Signal to store countries

  ngOnInit() {
    // Initialize form with empty values
    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      country: ['']
    });

    this.loadInitialData(); // Load all recipes and filter data initially

    // Listen for form changes and apply filters
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  loadInitialData() {
    // Fetch all recipes
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => this.recipes.set(data),
      error: (err) => console.error('Error fetching recipes:', err)
    });

    // Fetch categories and extract category names
    this.recipeService.getCategories().subscribe({
      next: (data) => this.categories.set(data.map(cat => cat.category)),
      error: (err) => console.error('Error fetching categories:', err)
    });

    // Fetch countries and extract country names
    this.recipeService.getCountries().subscribe({
      next: (data) => this.countries.set(data.map(c => c.country)),
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  applyFilters() {
    const { search, category, country } = this.filterForm.value;

    // Fetch filtered recipes
    this.recipeService.getFilteredRecipes(category, country, search).subscribe({
      next: (filteredData) => this.recipes.set(filteredData),
      error: (err) => console.error('Error filtering recipes:', err)
    });
  }

  viewRecipe(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}
