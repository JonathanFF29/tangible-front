import { Pipe, PipeTransform } from '@angular/core';
import { LoadCategoriesService } from '../pages/store/services/load-categories.service';

@Pipe({
  name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

  constructor(private _loadCtg: LoadCategoriesService) { }

  transform(value: any, flag: any): any {
    if (value === undefined || this._loadCtg.filterCompanies.length === 0) return value;

    const resultPosts = [];
    let approved: boolean = false;
    for (const post of value) {
      this._loadCtg.filterCompanies.forEach(company => post.creator === company ? approved = true : approved);
      if (approved) {
        resultPosts.push(post);
      }
      approved = false;
    }
    return resultPosts;
  }

}
