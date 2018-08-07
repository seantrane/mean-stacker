import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  selector: 'app-home'
})
export class HomeComponent {

  title = 'MEAN Stacker';
  textparams = {title: this.title};
  highlightColor: string;

}
