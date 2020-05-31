import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { LoadingController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-rota',
  templateUrl: './employee-rota.page.html',
  styleUrls: ['./employee-rota.page.scss'],
})
export class EmployeeRotaPage implements OnInit {

  loadedEmployee;
  dateNow = new Date();
  returnedSchedule: any;
  sunday: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  dateSelection: any;
  listOfSchedules = [];
  scans = [];
  schedule: any;



  constructor(private scheduleService: ScheduleService, private loadingController: LoadingController,
              private empServ: EmployeeService, private router: Router) { }

  ngOnInit() {

    this.sunday = '';
    this.monday = '';
    this.tuesday = '';
    this.wednesday = '';
    this.thursday = '';
    this.friday = '';
    this.saturday = '';

    this.loadedEmployee = JSON.parse(localStorage.getItem('newObject'));

    this.getAllSchedules(this.loadedEmployee._id);

    this.getScans();

    }



    fetchRotaByDate(date) {

      this.scheduleService.getScheduleByDate(this.loadedEmployee._id, date).subscribe (data => {
        this.returnedSchedule = data[0];
        if (!this.returnedSchedule) {
          this.presentLoadingWithOptions('There is no schedule for the selected date for you!');
          this.sunday = '';
          this.monday = '';
          this.tuesday = '';
          this.wednesday = '';
          this.thursday = '';
          this.friday = '';
          this.saturday = '';
        } else {
          console.log(this.returnedSchedule);
          this.sunday = this.returnedSchedule.sunday;
          this.monday = this.returnedSchedule.monday;
          this.tuesday = this.returnedSchedule.tuesday;
          this.wednesday = this.returnedSchedule.wednesday;
          this.thursday = this.returnedSchedule.thursday;
          this.friday = this.returnedSchedule.friday;
          this.saturday = this.returnedSchedule.saturday;
        }
      });
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

getDate() {
  this.fetchRotaByDate(this.dateSelection);
}

onLogout() {
  this.empServ.logout();
  this.router.navigate(['/']);
}




getScans() {
  this.scheduleService.getAllEmp(this.loadedEmployee._id).subscribe(data => {
    const newVal = JSON.stringify(data);
    localStorage.setItem('scansList', newVal);
    const jsonVal = JSON.parse(localStorage.getItem('scansList'));
    jsonVal.forEach(element => {
    element.records.forEach(elem => {
      this.scans.push(elem.clientName);
      this.scans.push(elem.dateTime);
      this.scans.push(elem.typeOfScan);
    });
  });
    console.log(this.scans);
  });
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

showMessage() {
this.presentLoadingWithOptions('Sorry, this does not work yet!');
}

}
