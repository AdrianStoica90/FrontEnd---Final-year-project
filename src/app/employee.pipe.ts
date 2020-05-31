import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
