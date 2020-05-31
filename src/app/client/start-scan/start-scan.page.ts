import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Howl } from 'howler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-scan',
  templateUrl: './start-scan.page.html',
  styleUrls: ['./start-scan.page.scss'],
})
export class StartScanPage implements OnInit {

  statusOfCamera: boolean;

  // variable for tune player
  player: Howl = null;
  Tracks = [
    {
      name: 'bensound-summer',
      path: '../../../assets/wav/bensound-summer.mp3'
    },
  ];

  clientName: any;

  // variables for saving data and displaying the scans
  listOfScans = [{id: '', name: '', surname: '', dateTime: ''}];
  employees = [];
  dateTime = '';
  stringID = '';




  constructor(private scheduleServ: ScheduleService,
              private empServ: EmployeeService,
              private router: Router) { }



ngOnInit() {

    this.statusOfCamera = true;

    this.clientName = JSON.parse(localStorage.getItem('newObject')).clientName;
    this.fetchEmployees();
    this.listOfScans.pop();
    this.empServ.presentAlert('Touch the image to trigger the scan!');
  }


fetchEmployees() {
    this.empServ.getAllEmployees().subscribe((data: Employee[]) => {

      // take out all client and admin records before displaying the list of employees
      data.forEach(element => {
        if (element.assignment !== 'admin' && element.assignment !== 'client') {
          this.employees.push(element);
        }
      });
      this.employees = [...new Set(this.employees)];
      const newLocal = 'employeesList';
      localStorage.setItem(newLocal, JSON.stringify(this.employees));
    });
  }

playAudio(typeOfSount: string) {
    const audio = new Audio();
    audio.src = '/client/' + typeOfSount + '.wav';

    audio.load();
    audio.play();
  }


start(track) {
    this.player = new Howl({
      src: ['../../../assets/wav/' + track + '.wav']
    });
    this.player.play();
  }

  setStringID(event) {
    this.stringID = event;
  }

  scanNow() {
    const newDate = new Date();
    this.dateTime = newDate.getDate() + '-' + newDate.getTime();

    // check if the user (qrcode) belongs to a registered user

    const checkUser = this.employees.find(ob => ob._id === this.stringID);
    console.log(checkUser);

    if (checkUser === undefined) {
      // unrecognised qrcodes will not be scanned

      this.start('badScan');
      this.empServ.presentAlert('QRCode is not recognised! The QRCode must belong to a registered active user.');
      this.stringID = '';
    } else {

      // the barcode is belongs to an active user
      this.scheduleServ.startShift(this.stringID.toString(), this.clientName.toString()).subscribe(result => {
        if (result[0].error === 'Person is currently scanned IN!') {

          // user is already scanner in
          this.start('badScan');
          this.empServ.presentAlert('Person is currently scanned IN');
          this.stringID = '';
      } else {
        // user gets scanned in and records get added into the listOfScans for displaying it

        const dateTime = new Date();
        this.employees.forEach(element => {
          if (element._id === this.stringID) {
            this.listOfScans.unshift({id: this.stringID, name: element.name, surname: element.surname,
              dateTime: dateTime.toString().split('GMT')[0]});
            this.start('goodScan');
            this.stringID = '';
          }
      });
      }
    },
      err => {this.empServ.presentAlert(err.error);
        // if the server returns an error
              this.start('badScan');
              this.stringID = ''; });
      }
  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
    this.statusOfCamera = false;
  }

}







