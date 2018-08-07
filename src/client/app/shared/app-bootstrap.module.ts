import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [BsDropdownModule.forRoot()],
  exports: [BsDropdownModule]
})
export class AppBootstrapModule {}
