import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  template: `<div class="btn-group" dropdown>
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false" dropdownToggle>
      {{ 'HOME.CHANGE_LANGUAGE' | translate }} <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" *dropdownMenu>
      <li *ngFor="let l of languages"><a [routerLink]="" (click)="use(l)">{{ l | uppercase }}</a></li>
    </ul>
  </div>`
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(private _translateService: TranslateService) { }

  public languages: Array<string> = [];

  public ngOnInit(): void {
    this.languages = this._translateService.getLangs();
  }

  public use(languageKey: string): boolean {
    this._translateService.use(languageKey);

    return false;
  }

}
