import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  imports: [CookieModule.forRoot()],
  exports: [CookieModule]
})
export class AppCookieModule {}
