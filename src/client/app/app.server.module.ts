import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

// ngx-cookie is disabled because; https://github.com/salemdar/ngx-cookie/issues/51
// import { CookieService, CookieBackendService } from 'ngx-cookie';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
    // @see https://github.com/salemdar/ngx-cookie#-angular-universal-usage
    // ngx-cookie is disabled because; https://github.com/salemdar/ngx-cookie/issues/51
    // { provide: CookieService, useClass: CookieBackendService }
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
