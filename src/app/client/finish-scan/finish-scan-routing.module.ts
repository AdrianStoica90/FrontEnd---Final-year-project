import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishScanPage } from './finish-scan.page';

const routes: Routes = [
  {
    path: '',
    component: FinishScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishScanPageRoutingModule {}
