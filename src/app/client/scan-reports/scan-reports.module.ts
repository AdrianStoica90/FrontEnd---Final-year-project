import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanReportsPageRoutingModule } from './scan-reports-routing.module';

import { ScanReportsPage } from './scan-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanReportsPageRoutingModule
  ],
  declarations: [ScanReportsPage]
})
export class ScanReportsPageModule {}
