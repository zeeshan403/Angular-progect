import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let currentYear:any = new Date().getFullYear();
    let userBirthYear:any = new Date(value).getFullYear();
    let userAge = currentYear-userBirthYear;

    return userAge;
  }

}
