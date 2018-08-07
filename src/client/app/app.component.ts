import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MEAN Stacker';

  constructor(
    private readonly meta: MetaService,
    private readonly _translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    this._translateService.addLangs(['en', 'es', 'fr', 'it', 'pt']);
    this._translateService.setDefaultLang('en');
    this._translateService.use(this._translateService.getBrowserLang()).subscribe(() => {
      this.meta.setTag('og:locale', 'en');
    });
    // this.meta.setTitle(`Page for ${this.title}`);
    // this.meta.setTag('description', `Description for ${this.title}`);
  }

}
