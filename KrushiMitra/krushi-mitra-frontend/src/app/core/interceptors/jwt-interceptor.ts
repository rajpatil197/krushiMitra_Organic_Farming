import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

   // If we have a token, clone the request and attach the Authorization header
  if(token){
    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
  return next(cloneReq);
  }
  // If no token exists (e.g., login or register calls), let the request pass through unchanged
  return next(req);
};
