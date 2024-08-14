import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';



import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { FddComponent } from './agile/fdd/fdd.component';
import { MethodeDashboardComponent } from './methode-dashboard/methode-dashboard.component';


import { StartQuizzComponent } from '../pages/start-quizz/start-quizz.component';
import { QuizzComponent } from '../pages/quizz/quizz.component';
import { SubmitQuizzComponent } from '../pages/submit-quizz/submit-quizz.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { CalendarComponent } from '../pages/calendar/calendar.component';

import { TaskManagementComponent } from '../pages/task-management/task-management.component';
//import { UserStoryManagementComponent } from '../pages/user-story-management/user-story-management.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'tasks', component: TaskManagementComponent },
   // { path: 'user-stories', component: UserStoryManagementComponent },
  


    { path: 'startquiz', component: StartQuizzComponent },
    { path: 'quizz/:title', component: QuizzComponent },
    { path: 'submit-quizz/:userId/:quizId', component: SubmitQuizzComponent },
    { path: 'calend', component: CalendarComponent },

    {
      path: 'fdd',
      component: FddComponent,
    },
    {
      path: 'home',
      component: HomepageComponent,
    },
    {
      path: 'methodeDashboard',
      component: MethodeDashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
