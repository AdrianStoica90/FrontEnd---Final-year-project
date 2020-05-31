import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishScanPageRoutingModule } from './finish-scan-routing.module';

import { FinishScanPage } from './finish-scan.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [ZXingScannerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FinishScanPageRoutingModule
  ],
  declarations: [FinishScanPage]
})
export class FinishScanPageModule {}
