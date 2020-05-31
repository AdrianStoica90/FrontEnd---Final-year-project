import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  employees = [];

  activeUser: any;
  userName: string;
  userID: string;

  queryString: string;

  constructor(private empServ: EmployeeService,
              private router: Router) { }

  ngOnInit() {

    this.activeUser = JSON.parse(localStorage.getItem('newObject'));
    console.log(JSON.stringify(this.activeUser.name));
    this.userName = this.activeUser.name;
    this.userID = this.activeUser._id;
    if (localStorage.getItem('usertype') === 'admin') {
      this.fetchEmployees();
    } else {
      this.empServ.presentAlert('You do not have access here!');
      this.router.navigate(['/']);
    }
  }

  fetchEmployees() {
    this.empServ.getAllEmployees().subscribe((data: Employee[]) => {

      // take out all client and admin records before displaying the list of employees
      data.forEach(element => {
        if (element.assignment !== 'admin' && element.assignment !== 'client') {
          this.employees.push(element);
        }
      });
      this.employees = [...new Set(this.employees)].reverse();
      localStorage.setItem('employeesList', JSON.stringify(this.employees));
    });
  }

  updateList(value) {
    const queryStringLower = value.toLowerCase();
    if (!value) {
      this.employees = JSON.parse(localStorage.getItem('employeesList'));
    } else {
    const filteredList = [];
    this.employees.forEach(employee => {
      if (employee.name.toLowerCase().includes(queryStringLower)) {
        filteredList.push(employee);
      }
    });
    this.employees = filteredList;
    Array.from(this.employees);
  }
  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
  }


  refreshList() {
    this.employees = [];
    this.fetchEmployees();
    // tslint:disable-next-line: no-unused-expression
  }
}
