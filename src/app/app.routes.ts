import { RouterModule, Routes } from '@angular/router';
import { Dashboard} from './dashboard/dashboard';
import { Login } from './login/login';
import { NgModule } from '@angular/core';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "admin", component: Admin },
  { path: "dashboard", component: Dashboard },
  { path: "login", component: Login }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutes { }
