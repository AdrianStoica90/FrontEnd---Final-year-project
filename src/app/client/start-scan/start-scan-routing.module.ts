import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartScanPage } from './start-scan.page';

const routes: Routes = [
  {
    path: '',
    component: StartScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartScanPageRoutingModule {}
