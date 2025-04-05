import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './reducers/counter.reducer';
// import { MoviesEffects } from './effects/counter.effect';
import { CounterEffects } from './effects/counter.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({ counter: counterReducer }),
    provideEffects(CounterEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }) 
  ]
};
