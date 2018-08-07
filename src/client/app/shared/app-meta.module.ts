import { NgModule } from '@angular/core';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'MEAN Stacker',
    defaults: {
      title: 'MEAN Stacker',
      description: 'MEAN Stacker is a MEAN stack starter kit.',
      'og:image': '',
      'og:type': 'website',
      'og:locale': 'en',
      'og:locale:alternate': 'en_US,en_GB'
    }
  });
}

@NgModule({
  imports: [MetaModule.forRoot({
    provide: MetaLoader,
    useFactory: (metaFactory)
  })],
  exports: [MetaModule]
})
export class AppMetaModule {}
