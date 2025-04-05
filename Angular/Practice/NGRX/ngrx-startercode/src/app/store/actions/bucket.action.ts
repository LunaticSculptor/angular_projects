import { createAction, props } from "@ngrx/store";
import { Bucket } from "../../../models/bucket.model";



export const addToBucket = createAction(
    '[Bucket] Add',
    // props<{id: number, name: string}>()
    props<{payload: Bucket}>()
)

export const removeFromBucket = createAction(
    '[Bucket] Remove',
    // props<{id: number, name: string}>()
    props<{payload: Partial<Bucket>}>()
)