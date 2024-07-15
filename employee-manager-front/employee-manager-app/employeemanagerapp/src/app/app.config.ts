import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  //to solve the problem of httpClient we have to put
  //provideHttpClient() with the providers
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient()],
   
};
