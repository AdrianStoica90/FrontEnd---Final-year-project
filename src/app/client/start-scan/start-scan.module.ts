import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartScanPageRoutingModule } from './start-scan-routing.module';

import { StartScanPage } from './start-scan.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    ZXingScannerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    StartScanPageRoutingModule
  ],
  declarations: [StartScanPage]
})
export class StartScanPageModule {}
