import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // provide httpClinet
    provideHttpClient(withFetch()),
    // provide router
    provideRouter(
    routes , withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration : "enabled"})), 
    // 
    provideClientHydration() ,
   ]
};
