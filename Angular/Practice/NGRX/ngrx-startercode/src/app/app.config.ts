import { ApplicationConfig, provideZoneChangeDetection, provideExperimentalZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { groceryReducer } from './store/reducers/grocery.reducers';
import { bucketReducer } from './store/reducers/bucket.reducer';
import { MoviesEffects } from './store/effects/grocery.effect';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      groceries: groceryReducer,
      myBucket: bucketReducer,
    }),
    provideEffects(MoviesEffects),
    provideStoreDevtools({
      maxAge: 3, // Retains last 3 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // pauses recording actions and state changes when the extension is closed
      trace: false, // If set to true, will include stack trace for every dispatch 
      traceLimit: 75, // max stack trace frames to be stored (in case trace
      connectInZone: true, // If set to true, the connection is established within 
    }),
    provideEffects(),
  ]
};
