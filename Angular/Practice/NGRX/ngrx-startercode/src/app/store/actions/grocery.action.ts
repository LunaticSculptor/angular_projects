import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Grocery } from "../../../models/grocery.model";

// export const initGroceries = createAction('[Grocery] Load Groceries');
// export const completedGroceries = createAction('[Grocery] Load Groceries success');

export const groceryAction = createActionGroup({
    source:"Grocery API",
    events: {
        'Load Groceries': emptyProps(),
        'Load Groceries Success': props<{payload: Grocery[]}>(),
        'Load Groceries Failure': emptyProps(),
    }
})