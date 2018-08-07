import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  selector: 'app-navbar'
})
export class NavbarComponent {
  @Input() isNavbarSticky = true;
  title = 'MEAN Stacker';
}
