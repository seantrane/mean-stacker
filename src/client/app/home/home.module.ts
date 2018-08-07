import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { LanguageSwitcherComponent } from './language-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LanguageSwitcherComponent
  ],
  exports: [
    HomeComponent,
    LanguageSwitcherComponent
  ]
})
export class HomeModule {}
