import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { PoliciesComponent } from './policies/policies';
import { ResourcesComponent } from './resources/resources';
import { AccessCheckerComponent } from './access-checker/access-checker';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'access-checker', component: AccessCheckerComponent }
];
