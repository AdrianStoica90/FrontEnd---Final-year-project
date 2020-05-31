import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor( private router: Router,
               private empServ: EmployeeService) { }

  listOfClients = [];

  loadedUserName = '';
  loadedUserSurname = '';



  ngOnInit() {

    const thisUser = JSON.parse(localStorage.getItem('newObject'));

    this.loadedUserName = thisUser.name;
    this.loadedUserSurname = thisUser.surname;

    if (localStorage.getItem('usertype') === 'client') {


    } else {
      this.empServ.presentAlert('You do not have access here!');
      this.router.navigate(['/']);
    }
  }

  myFn(resultString) {
    console.log(resultString);
  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
  }
}
