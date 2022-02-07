import { Pipe, PipeTransform } from '@angular/core';
import { LoadCategoriesService } from '../pages/store/services/load-categories.service';

@Pipe({
  name: 'formatFilter'
})
export class FormatFilterPipe implements PipeTransform {

  constructor(private _loadCtg: LoadCategoriesService) { }

  transform(value: any, ...args: any[]): any {
    if (value === undefined || this._loadCtg.filterFormats.length === 0) return value;

    const resultPosts = [];
    let approved: boolean = false;
    for (const post of value) {
      this._loadCtg.filterFormats.forEach(format => { 
        post.formats.forEach(e => e === format ? approved = true : approved ); 
      });
      if (approved) {
        resultPosts.push(post);
      }
      approved = false;
    }
    return resultPosts;
  }

}
