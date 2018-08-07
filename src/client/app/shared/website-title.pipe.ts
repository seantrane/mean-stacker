import { Pipe, PipeTransform } from '@angular/core';

/**
 * Suffix the input string with the brand " - Website Title"
 */

@Pipe({
  name: 'appWebsiteTitle'
})
export class WebsiteTitlePipe implements PipeTransform {

  _title = 'The MEAN Stacker';

  transform(text: string): string {
    return (text === '') ? this._title : `${text} - ${this._title}`;
  }

}
