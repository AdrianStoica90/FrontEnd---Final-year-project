import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeRotaPageRoutingModule } from './employee-rota-routing.module';

import { EmployeeRotaPage } from './employee-rota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeRotaPageRoutingModule
  ],
  declarations: [EmployeeRotaPage]
})
export class EmployeeRotaPageModule {}
