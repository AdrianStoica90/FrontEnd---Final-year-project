import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanReportsPage } from './scan-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ScanReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanReportsPageRoutingModule {}
