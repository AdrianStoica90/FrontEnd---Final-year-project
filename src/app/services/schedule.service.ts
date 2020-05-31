import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  uri = 'http://localhost:3000';


  constructor(private alertController: AlertController, private http: HttpClient) { }

   // alert display function
   async presentAlert(mess) {
    const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'So...',
    message: mess,
    buttons: ['OK']
  });

    await alert.present();
}

// add new schedule for an employee

// tslint:disable-next-line: variable-name
addRota(id, sunday_startOfWeekDate, sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
  const reqBody = {
    // tslint:disable-next-line: object-literal-shorthand
    id: id,
    // tslint:disable-next-line: object-literal-shorthand
    startOfWeek: sunday_startOfWeekDate,
    // tslint:disable-next-line: object-literal-shorthand
    sunday: sunday,
    // tslint:disable-next-line: object-literal-shorthand
    monday: monday,
    // tslint:disable-next-line: object-literal-shorthand
    tuesday: tuesday,
    // tslint:disable-next-line: object-literal-shorthand
    wednesday: wednesday,
    // tslint:disable-next-line: object-literal-shorthand
    thursday: thursday,
    // tslint:disable-next-line: object-literal-shorthand
    friday: friday,
    // tslint:disable-next-line: object-literal-shorthand
    saturday: saturday,
    // tslint:disable-next-line: object-literal-shorthand
  };
  return this.http.post(`${this.uri}/addRota`, reqBody);
}


// get schedule based on date for an employee

getScheduleByDate(id, requestDate) {

  const idDateRequest = id + '"' + requestDate;

  return this.http.get(`${this.uri}/employees/rota/${idDateRequest}`);
}


// get all records of all clients/employees

getAllSchedules() {
  return this.http.get(`${this.uri}/scans`);
}


// get all records of a specific client

getClientRecords(clientName) {
  return this.http.get(`${this.uri}/record/${clientName}`);
}

// start of shift scanning

startShift(empID, clientName) {

  const reqBody = {
    employeeID: empID,
    // tslint:disable-next-line: object-literal-shorthand
    clientName: clientName
  };

  return this.http.post(`${this.uri}/client/start`, reqBody);
}


// end of shift scanning

finishShift(empID, clientName) {
  const reqBody = {
    employeeID: empID,
    // tslint:disable-next-line: object-literal-shorthand
    clientName: clientName
  };
  return this.http.post(`${this.uri}/client/finish`, reqBody);
}

// get all scans of a specific employee

getAllEmp(id) {
  return this.http.get(`${this.uri}/empRecord/${id}`);
}


// get all schedules of a specific employee

getSchedulesEmp(id) {
  return this.http.get(`${this.uri}/employees/getSchedules/${id}`);
}

}
