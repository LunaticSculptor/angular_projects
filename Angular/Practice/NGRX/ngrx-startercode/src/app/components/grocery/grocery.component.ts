import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBucket, removeFromBucket } from '../../store/actions/bucket.action';
import { selectGroceries, selectGroceryByType } from '../../store/selectors/grocery.selectors';


@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {

  groceries$?:Observable<Grocery[]>;
  filetredGroceries$?:Observable<Grocery[]>;

  constructor(private store: Store<{groceries:Grocery[]}>){
    // this.groceries$ = store.select("groceries");
    this.groceries$ = store.select(selectGroceries);
    // this.groceries$ = store.select(selectGroceryByType);
    // store.select(selectGroceryByType).subscribe(data => {
    //   console.log('data 2', data)
    // });

  }


  onTypeChange(event: Event){
    const selectedType = (event.target as HTMLSelectElement).value;
    if(selectedType){
      this.filetredGroceries$ = this.store.select(selectGroceryByType(selectedType))
    }else{
      this.filetredGroceries$ = undefined;
    }
  }


  increment(item:Grocery){
    const payload = {
      id:item.id,
      name:item.name,
      quantity:1
    }
    // this.store.dispatch({type:"Update", payload: payload});
    // this.store.dispatch(addToBucket({id:payload.id, name:payload.name}))
    // this.store.dispatch(addToBucket({payload: payload}));
    this.store.dispatch(addToBucket({payload}));

  }
  decrement(item:Grocery){
    const payload = {
      id:item.id,
      
    }
    this.store.dispatch(removeFromBucket({payload}))


  }

}
