import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBootstrapModule } from './app-bootstrap.module';
// ngx-cookie is disabled because; https://github.com/salemdar/ngx-cookie/issues/51
// import { AppCookieModule } from './app-cookie.module';
import { AppFormsModule } from './app-forms.module';
import { AppHttpClientModule } from './app-http-client.module';
import { AppMetaModule } from './app-meta.module';
import { AppRoutingModule } from './app-routing.module';
import { AppTranslateModule } from './app-translate.module';

import { HighlightDirective } from './highlight.directive';
import { WebsiteTitlePipe } from './website-title.pipe';

@NgModule({
  imports: [
    AppBootstrapModule,
    // AppCookieModule,
    AppFormsModule,
    AppHttpClientModule,
    AppMetaModule,
    AppRoutingModule,
    AppTranslateModule,
    CommonModule
  ],
  declarations: [
    HighlightDirective,
    WebsiteTitlePipe
  ],
  exports: [
    AppBootstrapModule,
    // AppCookieModule,
    AppFormsModule,
    AppHttpClientModule,
    AppMetaModule,
    AppRoutingModule,
    AppTranslateModule,
    CommonModule,
    HighlightDirective,
    WebsiteTitlePipe
  ]
})
export class SharedModule {}
