import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  recipe = signal<any | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (data) => this.recipe.set(data),
        error: (err) => console.error('Error fetching recipe:', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/recipe-details']);
  }

  editRecipe() {
    this.router.navigate(['/recipe-form', this.route.snapshot.paramMap.get('id')]);
  }  

  deleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.recipeService.deleteRecipe(id).subscribe({
          next: () => {
            alert('Recipe deleted successfully!');
            this.router.navigate(['/recipe-details']);
          },
          error: (err) => console.error('Error deleting recipe:', err)
        });
      }
    }
  }
}
