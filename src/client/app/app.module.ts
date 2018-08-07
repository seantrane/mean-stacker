import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// core module and components
import { CoreModule } from './core/core.module';
// shared modules/pipes/directives/etc.
import { SharedModule } from './shared/shared.module';
// // import modules (and their components/services/etc.)
import { HomeModule } from './home/home.module';
// import { UsersModule } from './users';
// // import services
// // import {  } from './services';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mean-stacker' }),
    CoreModule,
    HomeModule,
    SharedModule
    // UsersModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'en' } ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
