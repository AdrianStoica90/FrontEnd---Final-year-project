import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    ZXingScannerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPageRoutingModule
  ],
  declarations: [ClientPage]
})
export class ClientPageModule {}
