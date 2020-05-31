import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  nameInput = '';
  surnameInput = '';
  emailInput = '';
  clientNameInput = '';
  clientNameVisible = false;
  passwordInput = '';
  userType: string;
  buttonStatus = true;

  constructor(private empServ: EmployeeService, private router: Router) { }

  ngOnInit() {


  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
  }

  onTypeSelect(event) {


    // if client type is selected then assignment = name of client = clientInput
    if (event.detail.value === 'worker') {
      this.clientNameInput = '';
      this.userType = 'worker';
      this.clientNameVisible = false;
      this.buttonStatus = false;

    } else if (event.detail.value === 'admin') {

      this.userType = 'admin';
      this.clientNameInput = 'admin';
      this.clientNameVisible = true;
      this.buttonStatus = false;

    } else {
      this.userType = 'client';
      this.clientNameVisible = false;
      this.buttonStatus = false;

    }

  }

  onCreateNew() {
    const status = 'active';
    console.log(this.nameInput,
      this.surnameInput,
      this.emailInput,
      this.passwordInput,
      this.userType,
      status,
      this.clientNameInput);

    this.empServ.addEmployee(
      this.nameInput,
      this.surnameInput,
      this.emailInput,
      this.passwordInput,
      this.userType,
      status,
      this.clientNameInput).subscribe(result => {
        this.empServ.presentAlert('Employee successfuly added!');
        this.nameInput = '';
        this.surnameInput = '';
        this.emailInput = '';
        this.passwordInput = '';
        this.clientNameInput = '';
      },
      err => {
        this.empServ.presentAlert(err.error);
      });
  }

}
