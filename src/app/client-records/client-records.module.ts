import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientRecordsPageRoutingModule } from './client-records-routing.module';

import { ClientRecordsPage } from './client-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientRecordsPageRoutingModule
  ],
  declarations: [ClientRecordsPage]
})
export class ClientRecordsPageModule {}
