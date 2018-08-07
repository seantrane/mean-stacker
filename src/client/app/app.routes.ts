import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { HomeComponent } from './home/home.component';

// import { DashboardComponent }   from './dashboard/dashboard.component';
// import { HeroesComponent }      from './heroes/heroes.component';
// import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          meta: {
            // title: 'SITE.TITLE',
            // description: 'Home, home sweet home... and what?',// 'SITE.DESCRIPTION',
            override: true // prevents appending/prepending the application name to the title attribute
          }
        }
      }
    ]
  }
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
];
