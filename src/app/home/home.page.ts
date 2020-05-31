import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

enteredUser: string;
enteredPassword: string;
navigationPage: string;
activeuser: any;
usertype = '';
sessionToken = '';
employee: any;
newUser: any;

constructor(private empService: EmployeeService,
            private router: Router) {}

ngOnInit() {
}


goToPage(page: string): void {
  this.router.navigate(['$[page]']);
}

public onLogout() {
  localStorage.clear();
}

public onLogin() {
  const theUser = this.enteredUser;
  const thePass = this.enteredPassword;

/* - this was used for debugging
  console.log(this.enteredPassword);
  console.log(this.enteredUser);
  */

  // try to login
  this.empService.login(theUser, thePass).subscribe(resp => {
    // save response in activeuser
    this.activeuser = resp;
    localStorage.setItem('newObject', JSON.stringify(this.activeuser));
    console.log(localStorage.getItem('newObject'));

    // get usertype from response object
    this.usertype = this.activeuser.assignment;


    // save usertype into localstorage
    localStorage.setItem('usertype', this.usertype);

    if (localStorage.getItem('usertype') === '') {
      this.empService.presentAlert('You must sign in first...');

      // redirect to sign-in page
      this.router.navigate(['/']);

    } else if (this.usertype === 'admin') {
     // send to admin page
     this.router.navigate(['/admin']);

    } else if (this.usertype === 'client') {
      // send to client page
      this.router.navigate(['/client']);

    } else if (this.usertype !== '') {
      // redirect to employee page
      this.navigationPage = 'employee';
      this.router.navigate(['/employee']);
    }

  },
  err => this.empService.presentAlert(JSON.stringify(err.error)));
  }

}
