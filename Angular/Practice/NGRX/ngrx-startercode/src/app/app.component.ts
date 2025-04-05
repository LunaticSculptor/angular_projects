import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BucketComponent } from './components/bucket/bucket.component';
import { GroceryComponent } from './components/grocery/grocery.component';
import { Store } from '@ngrx/store';
import { Grocery } from '../models/grocery.model';
import { selectGroceryByType } from './store/selectors/grocery.selectors';
import { groceryAction } from './store/actions/grocery.action';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BucketComponent,GroceryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private store: Store<{groceries:Grocery[]}>){
    // store.select(selectGroceryByType).subscribe(data => {
    //   console.log('data 1', data)
    // });
  }

  ngOnInit() {
    this.store.dispatch(groceryAction.loadGroceries())
  }
}