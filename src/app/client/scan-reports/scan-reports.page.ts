import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { LoadingController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan-reports',
  templateUrl: './scan-reports.page.html',
  styleUrls: ['./scan-reports.page.scss'],
})
export class ScanReportsPage implements OnInit {

loadedEmployee: any;
returnedSchedule: any;
listOfSchedules: any;
listOfScans = [];
listOfEmployees = [];









constructor(private scheduleService: ScheduleService,
            private loadingController: LoadingController,
            private empServ: EmployeeService,
            private router: Router) { }



ngOnInit() {

  this.loadedEmployee = JSON.parse(localStorage.getItem('newObject'));

  this.fetchEmployees();
  this.getScans();
  this.listOfScans.reverse();

  }

  async presentLoadingWithOptions(newMessage) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: newMessage,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
}

fetchEmployees() {
  this.empServ.getAllEmployees().subscribe((data: Employee[]) => {

    // take out all client and admin records before displaying the list of employees
    data.forEach(element => {
      if (element.assignment !== 'admin' && element.assignment !== 'client') {
        this.listOfEmployees.push(element);
      }
    });
    this.listOfEmployees = [...new Set(this.listOfEmployees)];
    console.log(this.listOfEmployees);
    localStorage.setItem('employeesList', JSON.stringify(this.listOfEmployees));
  });
}

getScans() {

  // getting scans of client from the database
  this.scheduleService.getClientRecords(this.loadedEmployee.clientName)
  .subscribe(data => {
    let response = JSON.parse(JSON.stringify(data));
    response = [...new Set(response)];
    response.forEach(element => {
      const month = element.dateTime.toString().split(' ')[1];
      const day = element.dateTime.toString().split(' ')[2];
      const year = element.dateTime.toString().split(' ')[3];
      const time = element.dateTime.toString().split(' ')[4];
      const dateTimeFormat = month + ' ' + day + ' ' + year + ' ' + time;
      this.listOfEmployees.forEach(elem => {
        if (elem._id === element.employeeID) {
          this.listOfScans.push({name: elem.name,
            surname: elem.surname, scanType: element.type,
            dateTime: dateTimeFormat});
        }
      });
    });

  }, err => {this.presentLoadingWithOptions('Could not get the requested information, please contact your systems administrator.'
  + err); });
  }

// this is triggered when the page is loaded, then data is saved.
getAllSchedules(id) {
this.scheduleService.getSchedulesEmp(id).subscribe(schedules => {
  if (!schedules) {
    this.presentLoadingWithOptions('Nothing to see here! You have no schedules yet. . .');
  } else {
    const newVal = JSON.stringify(schedules);
    localStorage.setItem('schedules', newVal);
    const objectList = JSON.parse(localStorage.getItem('schedules')).records;
    objectList.forEach(element => {
      this.listOfSchedules.push(element.sunday_startOfWeekDate);
    });
    this.listOfSchedules.reverse();
    }
  });
}

onLogout() {
  this.empServ.logout();
  this.router.navigate(['/']);
}




}
