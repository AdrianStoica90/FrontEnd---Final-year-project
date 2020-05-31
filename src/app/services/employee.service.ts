import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { JsonPipe } from '@angular/common';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeDetails: any;

  uri = 'http://localhost:3000';


  private messageSource = new BehaviorSubject<any>(this.employeeDetails);
  activeUser = this.messageSource.asObservable;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router) {}


    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }


  getActiveUser(user: any) {
    this.messageSource.next(user);
  }


  getAllEmployees() {
    return this.http.get(`${this.uri}/employees`);
  }

  getEmployee(id) {
    return this.http.get(`${this.uri}/employees/${id}`);
  }

  addEmployee(name, surname, email, password, assignment, status, clientName) {
    const employee = {
      // tslint:disable-next-line: object-literal-shorthand
      name: name,
      // tslint:disable-next-line: object-literal-shorthand
      surname: surname,
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      password: password,
      // tslint:disable-next-line: object-literal-shorthand
      assignment: assignment,
      // tslint:disable-next-line: object-literal-shorthand
      status: status,
       // tslint:disable-next-line: object-literal-shorthand
      clientName: clientName,

    };
    return this.http.post(`${this.uri}/employees/add`, employee);
  }

  updateEmployee(id, name, surname, email, assignment, status) {
    const employee = {
      // tslint:disable-next-line: object-literal-shorthand
      name: name,
      // tslint:disable-next-line: object-literal-shorthand
      surname: surname,
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      assignment: assignment,
      // tslint:disable-next-line: object-literal-shorthand
      status: status
    };
    return this.http.post(`${this.uri}/employees/update/${id}`, employee);
  }


  deleteEmployee(id) {
    return this.http.get(`${this.uri}/employees/delete/${id}`);
  }



  // login function
  login(username: string, pass: string) {
    this.employeeDetails = this.http.post(`${this.uri}/login`,
    {
      email: username,
      password: pass
    }
    );
    this.getActiveUser(this.employeeDetails);
    return this.employeeDetails;
  }


  // alert display function
  async presentAlert(mess) {
    const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'Message from the server: ',
    message: mess,
    buttons: ['OK']
  });

    await alert.present();
}

// logout function
logout() {
  localStorage.clear();
}


loggedIn() {
  return !!localStorage.getItem('usertype');
}


async presentConfirm(empName): Promise<any> {
  return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      header: 'Confirmation needed!',
      message: 'You are about to delete employee: ' + empName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            resolve('cancel');
          }
        }, {
          text: 'Ok',
          handler: (OK) => {
            resolve('ok');
          }
        }
      ]
    });
    alert.present();
  });
}
}
