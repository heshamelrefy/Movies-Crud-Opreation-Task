import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

    transform(allCategory:any[] , term:string): any {
    if(!term) {
    return allCategory;
    }
    else
    {
      // user can browse movies by category
      return allCategory.filter(function(allCategory) {
        return allCategory.category_id==term;
      })
    }
  }

}
