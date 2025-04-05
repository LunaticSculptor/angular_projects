import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs/operators";
import { increment, decrement, reset } from "../actions/counter";
import { CounterState } from "../store/counter.store";
import { Store } from "@ngrx/store";

@Injectable()
export class CounterEffects {
  // constructor(private actions$: Actions, private store: Store<{ counter: CounterState }>) {
    
  // }
  private actions$ = inject(Actions);
  private store = inject(Store<{ counter: CounterState }>);

  logCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increment, decrement, reset),
      withLatestFrom(this.store.select(state => state.counter.count)),
      tap(([action, count]) => {
        localStorage.setItem("counter", count.toString());
        console.log(`Action: ${action.type}, Count: ${count}`);
      })
    ), 
    { dispatch: false }
  );
}
