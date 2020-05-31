import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { EmployeeService } from './services/employee.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private empServ: EmployeeService, private router: Router) { }

  canActivate(): boolean {
    if (this.empServ.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

}
