import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.page.html',
  styleUrls: ['./scans.page.scss'],
})
export class ScansPage implements OnInit {


  activeUser: any;
  userName: string;
  userID: string;
  scans = [];

  scanResult: any;




  constructor(private router: Router,
              private empServ: EmployeeService,
              private scanService: ScheduleService) { }

  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('newObject'));
    console.log(JSON.stringify(this.activeUser.name));
    this.userName = this.activeUser.name;
    this.userID = this.activeUser._id;
    this.getScans();
  }


  getScans() {
    this.scanService.getAllEmp(this.userID).subscribe (data => {
        const response = JSON.parse(JSON.stringify(data))[0].records;
        response.forEach(element => {
          const month = element.dateTime.toString().split(' ')[1];
          const day = element.dateTime.toString().split(' ')[2];
          const year = element.dateTime.toString().split(' ')[3];
          const time = element.dateTime.toString().split(' ')[4];
          const dateTimeFormat = month + ' ' + day + ' ' + year + ' ' + time;
          this.scans.unshift({client: element.clientName, type: element.typeOfScan, dateTime: dateTimeFormat});
          });
         },
         err => {
            this.empServ.presentAlert('Sorry, there are no scans for you yet!');
          });
}

onLogout() {
  this.empServ.logout();
  this.router.navigate(['/']);
}

}

