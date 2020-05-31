import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ScheduleService } from '../services/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.page.html',
  styleUrls: ['./scans.page.scss'],
})
export class ScansPage implements OnInit {

  listOfRecords: any;


  displayText: string;
  queryString: string;



  constructor(private empServ: EmployeeService, private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit() {
    this.getAllScans();
  }

getAllScans() {
    this.scheduleService.getAllSchedules().subscribe(data => {
      if (!data) {
        this.displayText = 'No records available!';
      } else {
        const listOfScans = JSON.stringify(data);
        localStorage.setItem('scansList', listOfScans);
        this.listOfRecords = JSON.parse(listOfScans);
      }
    });
    console.log(this.listOfRecords);
  }

  updateList(value) {
    const queryStringLower = value.toLowerCase();
    if (!value) {
      this.listOfRecords = JSON.parse(localStorage.getItem('scansList'));
    } else {
    const filteredList = [];
    this.listOfRecords.forEach(scan => {
      if (scan.records[0].clientName.toLowerCase().includes(queryStringLower)) {
        filteredList.push(scan);
      }
    });
    this.listOfRecords = filteredList;
  }
  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
  }
}

