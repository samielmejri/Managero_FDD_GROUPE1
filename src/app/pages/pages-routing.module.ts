import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { FddComponent } from './agile/fdd/fdd.component';
import { MethodeDashboardComponent } from './methode-dashboard/methode-dashboard.component';


import { QuizListComponent } from '../pages/quiz-list/quiz-list.component';
import { CreateQuizComponent } from '../pages/create-quiz/create-quiz.component';
import { CreateQuestionComponent } from '../pages/create-question/create-question.component'; // Import here
import { QuestionListComponent } from '../pages/question-list/question-list.component'; // Import here
import { QuizafficheComponent } from '../pages/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from '../pages/questionaffiche/questionaffiche.component';
//import { StartQuizzComponent } from '../start-quizz.component';
import { QuizzComponent } from '../pages/quizz/quizz.component';
import { SubmitQuizzComponent } from '../pages/submit-quizz/submit-quizz.component';
import { QuizStatisticsComponent } from '../pages/quiz-statistics/quiz-statistics.component';
import { CalendarComponent } from '../pages/FullCalendar/FullCalendar.component';
import { QuizScheduleComponent } from '../pages/schedule-quiz/schedule-quiz.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'quizl', component: QuizListComponent },
    { path: 'newQuiz', component: CreateQuizComponent },
    { path: 'newQuestion', component: CreateQuestionComponent },
    { path: 'questionlist', component: QuestionListComponent },
    { path: 'quizaffiche', component: QuizafficheComponent },
    { path: 'questionaffiche', component: QuestionafficheComponent },
    //{ path: 'startquiz', component: StartQuizzComponent },
    { path: 'quizz/:title', component: QuizzComponent },
    { path: 'submit-quizz/:userId/:quizId', component: SubmitQuizzComponent },
    { path: 'quizstat', component: QuizStatisticsComponent },
    { path: 'calend', component: CalendarComponent },
    { path: 'quizsched', component: QuizScheduleComponent },



    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
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
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
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
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
