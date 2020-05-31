import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import { EmployeePipe } from '../employee.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [EmployeePage, EmployeePipe]
})
export class EmployeePageModule {}
