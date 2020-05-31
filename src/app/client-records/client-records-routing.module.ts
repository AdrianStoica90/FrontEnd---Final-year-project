import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientRecordsPage } from './client-records.page';

const routes: Routes = [
  {
    path: '',
    component: ClientRecordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRecordsPageRoutingModule {}
