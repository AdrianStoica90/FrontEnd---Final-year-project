import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'client',
    children: [
      {
        path: '',
        loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'start-scan',
        loadChildren: () => import('./client/start-scan/start-scan.module').then( m => m.StartScanPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'finish-scan',
        loadChildren: () => import('./client/finish-scan/finish-scan.module').then( m => m.FinishScanPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'scan-reports',
        loadChildren: () => import('./client/scan-reports/scan-reports.module').then( m => m.ScanReportsPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'employee',
    children: [
      {
        path: '',
        loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'rota',
        loadChildren: () => import('./employee-rota/employee-rota.module').then( m => m.EmployeeRotaPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'scans',
        loadChildren: () => import('./scans/scans.module').then( m => m.ScansPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'client-records',
        loadChildren: () => import('./client-records/client-records.module').then( m => m.ClientRecordsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'scans',
        loadChildren: () => import('./scans/scans.module').then( m => m.ScansPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: ':employeeID',
        loadChildren: () => import('./employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule),
        canActivate: [AuthGuard]
      }
    ]},
  {
    path: 'employee-rota',
    loadChildren: () => import('./employee-rota/employee-rota.module').then( m => m.EmployeeRotaPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
