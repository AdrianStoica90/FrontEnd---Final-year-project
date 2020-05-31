import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  activeUser: any;
  userName: string;
  userID: string;



  constructor(private router: Router,
              private empServ: EmployeeService) { }

  ngOnInit() {

    this.activeUser = JSON.parse(localStorage.getItem('newObject'));
    console.log(JSON.stringify(this.activeUser.name));
    this.userName = this.activeUser.name;
    this.userID = this.activeUser._id;

    // check userType - to avoid unwanted access by typing the route by hand (/client, /employee, /admin)
    if (localStorage.getItem('usertype') !== '') {
      if (localStorage.getItem('usertype') !== 'admin' ||
          localStorage.getItem('usertype') !== 'client') {

            // user is not admin and not client = can stay on page

          } else {
            // user is admin/client or not logged in = does not have access here

      this.empServ.presentAlert('You do not have access here!');
      this.router.navigate(['/']);
      }
  }

}


onLogout() {
  this.empServ.logout();
  this.router.navigate(['/']);
}


}

