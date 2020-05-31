import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {
  loadedEmployee: Employee[];



  constructor(private empServ: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private scheduleServ: ScheduleService,
              private router: Router) { }

  nameOfEmployee = '';
  surnameOfEmployee = '';
  email = '';
  status = '';
  assignment = '';

  employeeID = '';
  listOfRecords = [];
  defaultString = '';
  newString = '';
  formIsDisabled = true;

  sundayData = '';
  mondayData = '';
  tuesdayData = '';
  wednesdayData = '';
  thursdayData = '';
  fridayData = '';
  saturdayData = '';
  startDateInput = '';

  employees = [];


  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('employeeID')) {
        // redirect
        return;
      }
      const employeeID = paramMap.get('employeeID');
      this.empServ.getEmployee(employeeID).subscribe(emp => {

        this.loadedEmployee = this.json2array(emp);
        console.log(this.loadedEmployee);
        this.nameOfEmployee = this.loadedEmployee[1].toString();
        this.surnameOfEmployee = this.loadedEmployee[2].toString();
        this.employeeID = this.loadedEmployee[0].toString();
        this.email = this.loadedEmployee[3].toString();
        this.assignment = this.loadedEmployee[5].toString();
        this.status = this.loadedEmployee[6].toString();
        console.log(this.loadedEmployee);
        this.listOfRecords = this.json2array(this.loadedEmployee[8]);
        this.listOfRecords.shift();
        this.listOfRecords.reverse();
        console.log(this.listOfRecords);
        this.defaultString = this.nameOfEmployee + this.surnameOfEmployee + this.email + this.assignment;
        localStorage.setItem('defaultString', this.defaultString);
      });
    });

  }



json2array(json) {
    const result = [];
    const keys = Object.keys(json);
    keys.forEach((key) => {
        result.push(json[key]);
    });
    return result;
  }

  onInput(data): void {
    if (this.formIsDisabled) {
      this.formIsDisabled = false;
      console.log(data.target.value);
    } else {
      this.formIsDisabled = true;
    }
  }

  onSaveChanges() {
    this.empServ.updateEmployee(this.employeeID,
      this.nameOfEmployee, this.surnameOfEmployee,
      this.email, this.assignment, this.status).subscribe(response => {
        this.empServ.presentAlert(response);
        },
        err => {this.empServ.presentAlert(err.error); } );
  }
  onScheduleSubmit() {
    const newRecord = {
      id: 'Refresh to get it from the database',
      sunday_startOfWeekDate: this.startDateInput,
      sunday: this.sundayData,
      monday: this.mondayData,
      tuesday: this.tuesdayData,
      wednesday: this.wednesdayData,
      thursday: this.thursdayData,
      friday: this.fridayData,
      saturday: this.saturdayData
    };
    this.listOfRecords.unshift(newRecord);
    this.scheduleServ.addRota(this.employeeID,
      this.startDateInput, this.sundayData,
      this.mondayData, this.tuesdayData, this.wednesdayData,
      this.thursdayData, this.fridayData, this.saturdayData).subscribe(response => {
        this.empServ.presentAlert('New schedule was successfuly added!');
        this.startDateInput = '';
        this.sundayData = '';
        this.mondayData = '';
        this.tuesdayData = '';
        this.wednesdayData = '';
        this.thursdayData = '';
        this.fridayData = '';
        this.saturdayData = '';
      },
      err => {this.empServ.presentAlert(err.error); });
  }

  onDelete(empName, empID) {
    this.empServ.presentConfirm(empName) .then(res => {
      if (res === 'ok') {
        this.empServ.deleteEmployee(empID).subscribe(result => {
          this.empServ.presentAlert('Employee has been deleted!   ' + JSON.stringify(result));
          this.router.navigate(['/admin']);
          this.fetchEmployees();
        },
        err => {
          this.empServ.presentAlert(err.error);
        });
      } else {
        this.empServ.presentAlert('Unable to perform action. Please call your system administrator!');
      }
    });
  }

  fetchEmployees() {
    this.empServ.getAllEmployees().subscribe((data: Employee[]) => {

      // take out all client and admin records before displaying the list of employees
      data.forEach(element => {
        if (element.assignment !== 'admin' && element.assignment !== 'client') {
          this.employees.push(element);
        }
      });
      localStorage.setItem('employeesList', JSON.stringify(this.employees));
    });
  }

  explain(messageDisplay: string) {
    // tslint:disable-next-line: max-line-length
    this.empServ.presentAlert(messageDisplay);
  }

  onLogout() {
    this.empServ.logout();
    this.router.navigate(['/']);
  }

}
