import { Pipe, PipeTransform } from '@angular/core';
import { LoadCategoriesService } from '../pages/store/services/load-categories.service';

@Pipe({
  name: 'styleFilter'
})
export class StyleFilterPipe implements PipeTransform {

  constructor(private _loadCtg: LoadCategoriesService) { }

  transform(value: any, ...args: any[]): any {
    if (value === undefined || this._loadCtg.filterStyles.length === 0) return value;

    const resultPosts = [];
    let approved: boolean = false;
    for (const post of value) {
      this._loadCtg.filterStyles.forEach(style => { 
        post.tags.forEach(e => e === style ? approved = true : approved ); 
      });
      if (approved) {
        resultPosts.push(post);
      }
      approved = false;
    }
    return resultPosts;
  }

}
