import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const newsInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '';
  const clonedRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${apiKey}` }
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse)=>{
      console.log('Error Fetching news:',error);
      return throwError(()=>new Error(error.message));
    })
  );
};
