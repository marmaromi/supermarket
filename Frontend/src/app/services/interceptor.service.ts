import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes(environment.mainURL)) { // allows CORS from external APIs
            const token: string = localStorage.getItem('token');
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
            if (req.body?.toString() !== '[object FormData]') {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
                req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            }
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // Catching Error Stage
                    if (error && error.status === 401) {
                        console.log('ERROR 401 UNAUTHORIZED');
                    }
                    const err = error.error.message || error.statusText;
                    return throwError(() => error);
                })
            );
    }
}