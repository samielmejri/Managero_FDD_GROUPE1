import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

//import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
//import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
//import { CreateQuestionComponent } from './pages/create-question/create-question.component'; // Import here
//import { QuestionListComponent } from './pages/question-list/question-list.component'; // Import here
//import { QuizafficheComponent } from './pages/quizaffiche/quizaffiche.component';
//import { QuestionafficheComponent } from './pages/questionaffiche/questionaffiche.component';
//import { StartQuizzComponent } from './pages/start-quizz/start-quizz.component';
//import { QuizzComponent } from './pages/quizz/quizz.component';
//import { SubmitQuizzComponent } from './pages/submit-quizz/submit-quizz.component';
//import { QuizStatisticsComponent } from './pages/quiz-statistics/quiz-statistics.component';
//import { CalendarComponent } from './pages/FullCalendar/FullCalendar.component';
//import { QuizScheduleComponent } from './pages/schedule-quiz/schedule-quiz.component';
//import { HomepageComponent } from './pages/homepage/homepage.component';



export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },


 // { path: 'quizl', component: QuizListComponent },
  //{ path: 'newQuiz', component: CreateQuizComponent },
//  { path: 'newQuestion', component: CreateQuestionComponent },
//  { path: 'questionlist', component: QuestionListComponent },
  //{ path: 'quizaffiche', component: QuizafficheComponent },
//  { path: 'questionaffiche', component: QuestionafficheComponent },
//  { path: 'startquiz', component: StartQuizzComponent },
//  { path: 'quizz/:title', component: QuizzComponent },
//  { path: 'submit-quizz/:userId/:quizId', component: SubmitQuizzComponent },
//  { path: 'quizstat', component: QuizStatisticsComponent },
//  { path: 'calend', component: CalendarComponent },
//  { path: 'quizsched', component: QuizScheduleComponent },
//  { path: 'pages/home', component: HomepageComponent },

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
