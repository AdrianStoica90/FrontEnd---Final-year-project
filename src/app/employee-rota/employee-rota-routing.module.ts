import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeRotaPage } from './employee-rota.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeRotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRotaPageRoutingModule {}
