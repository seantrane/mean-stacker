import { inject, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarComponent]
    });
  });

  it('should be created', inject([NavbarComponent], (component: NavbarComponent) => {
    expect(true).toBeTruthy();
  }));

});
