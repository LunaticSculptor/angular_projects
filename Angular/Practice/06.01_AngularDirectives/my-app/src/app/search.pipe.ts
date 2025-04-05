import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }


  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items; // Return original array if no search term
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item =>
      item.toLowerCase().includes(searchTerm) // Filter based on key
    );
  }

}
