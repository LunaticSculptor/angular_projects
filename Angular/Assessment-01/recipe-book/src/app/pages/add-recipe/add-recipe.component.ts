import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  addForm = signal<FormGroup | null>(null);
  private formBuilder = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories = signal<any[]>([]);
  countries = signal<any[]>([]);
  editingRecipeId: string | null = null; // Track if we're editing

  constructor() {

    // Fetch categories and countries
    this.recipeService.getCategories().subscribe(categories => this.categories.set(categories));
    this.recipeService.getCountries().subscribe(countries => this.countries.set(countries));

    this.initForm();

    // Check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editingRecipeId = id;
        this.loadRecipeForEdit(id);
      }
    });
  }

  initForm() {
    const form = this.formBuilder.group({
      recipeInfo: this.formBuilder.group({
        recipeTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        receipeCategory: ['', [Validators.required]],
        receipeDescription: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]],
        servings: ['', [Validators.required], [this.quantityValidator.bind(this)]],
        ingredients: [''],
        instructions: [''],
        chefDetails: ['']
      }),

      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([]),

      chefInfo: this.formBuilder.group({
        chefName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        chefEmail: ['', [Validators.required, Validators.email]],
        chefMobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        chefExp: ['', [Validators.required], [this.quantityValidator.bind(this)]],
        chefDob: ['', [Validators.required, this.validateDate.bind(this)]],
        chefCountry: ['', Validators.required],
      })
    });
    this.addForm.set(form);
  }

  get instructions(): FormArray {
    return this.addForm()?.get('instructions') as FormArray;
  }

  get ingredients(): FormArray {
    return this.addForm()?.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
      this.formBuilder.group({
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required], [this.quantityValidator.bind(this)]],
        notes: ['', [Validators.required]]
      })
    );
  }

  addInstructions() {
    this.instructions.push(
      this.formBuilder.group({
        task: ['', [Validators.required]],
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  quantityValidator(control: AbstractControl) {
    const checkQuantity = control.value < 0 ? { invalidQuantity: true } : null;
    return of(checkQuantity);
  }

  validateDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate > today ? { futureDate: true } : null;
  }

  // Load Recipe Data when Editing
  loadRecipeForEdit(id: string) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      if (recipe) {
        this.addForm()?.patchValue({
          recipeInfo: {
            recipeTitle: recipe.title,
            receipeCategory: recipe.category,
            receipeDescription: recipe.description,
            imageUrl: recipe.imageUrl,
            servings: recipe.servings
          },
          chefInfo: {
            chefName: recipe.chefDetails?.name,
            chefExp: recipe.chefDetails?.experience,
            chefDob: recipe.chefDetails?.dateOfBirth,
            chefEmail: recipe.chefDetails?.contact?.email,
            chefMobile: recipe.chefDetails?.contact?.mobile,
            chefCountry: recipe.chefDetails?.contact?.country,
          }
        });

        // Set dynamic arrays
        const ingredientsArray = this.ingredients;
        ingredientsArray.clear();
        recipe.ingredients.forEach((ingredient: any) => {
          ingredientsArray.push(this.formBuilder.group({
            name: ingredient.name,
            quantity: ingredient.quantity,
            notes: ingredient.notes
          }));
        });

        const instructionsArray = this.instructions;
        instructionsArray.clear();
        recipe.steps.forEach((step: any) => {
          instructionsArray.push(this.formBuilder.group({
            task: step.step
          }));
        });
      }
    });
  }

  // Save Function (Handles Add & Edit)
  onSubmit() {
    if (this.addForm()?.invalid) {
      this.addForm()?.markAllAsTouched();
      return;
    }

    const formData = this.formatRecipeData(this.addForm()?.value);

    if (this.editingRecipeId) {
      this.updateRecipe(this.editingRecipeId, formData);
    } else {
      this.recipeService.saveRecipe(formData).subscribe(() => {
        alert('Recipe added successfully!');
        this.router.navigate(['/recipe-details']);
      });
    }
  }

  // Update an Existing Recipe
  updateRecipe(id: string, recipeData: any) {
    this.recipeService.updateRecipe(id, recipeData).subscribe(() => {
      alert('Recipe updated successfully!');
      this.router.navigate(['/recipe', id]); // Redirect back to details page
    });
  }

  formatRecipeData(formValue: any) {
    return {
      title: formValue.recipeInfo.recipeTitle,
      description: formValue.recipeInfo.receipeDescription,
      category: formValue.recipeInfo.receipeCategory,
      imageUrl: formValue.recipeInfo.imageUrl,
      servings: formValue.recipeInfo.servings,
      ingredients: formValue.ingredients,
      steps: formValue.instructions.map((inst: any) => ({ step: inst.task })),
      chefDetails: {
        name: formValue.chefInfo.chefName,
        experience: formValue.chefInfo.chefExp,
        dateOfBirth: formValue.chefInfo.chefDob,
        contact: {
          email: formValue.chefInfo.chefEmail,
          mobile: formValue.chefInfo.chefMobile,
          country: formValue.chefInfo.chefCountry
        }
      },
      published: new Date().toISOString()
    };
  }
}
