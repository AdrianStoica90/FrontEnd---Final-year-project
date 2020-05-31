import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-records',
  templateUrl: './client-records.page.html',
  styleUrls: ['./client-records.page.scss'],
})
export class ClientRecordsPage implements OnInit {


  listOfRecords: Employee[];
  listOfClients = [];
  queryString: string;


  constructor(private empServ: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.fetchClients();

  }


fetchClients() {
  this.empServ.getAllEmployees().subscribe((data: Employee[]) => {
    if (!data) {
      return;
    } else {
      data.forEach(record => {
        if (record.assignment === 'client') {
          this.listOfClients.push(record);
        }
      });
      localStorage.setItem('listOfClients', JSON.stringify(this.listOfClients));
    }
  });
}

updateList(value) {
  const queryStringLower = value.toLowerCase();
  if (!value) {
    this.listOfClients = JSON.parse(localStorage.getItem('listOfClients'));
  } else {
  const filteredList = [];
  this.listOfClients.forEach(employee => {
    if (employee.name.toLowerCase().includes(queryStringLower)) {
      filteredList.push(employee);
    }
  });
  this.listOfClients = filteredList;
}
}

onLogout() {
  this.empServ.logout();
  this.router.navigate(['/']);
}

}
