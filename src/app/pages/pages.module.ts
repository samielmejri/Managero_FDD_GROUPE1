import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NbMenuModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { NgxEchartsModule } from 'ngx-echarts';
import { StartQuizzComponent } from '../pages/start-quizz/start-quizz.component';
import { QuizzComponent } from '../pages/quizz/quizz.component';
import { SubmitQuizzComponent } from '../pages/submit-quizz/submit-quizz.component';
import { QuizListComponent } from '../pages/quiz-list/quiz-list.component';
import { CreateQuizComponent } from '../pages/create-quiz/create-quiz.component'; // Import ReactiveFormsModule
import { CreateQuestionComponent } from '../pages/create-question/create-question.component';
import { QuestionListComponent } from '../pages/question-list/question-list.component';
import { QuizafficheComponent } from '../pages/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from '../pages/questionaffiche/questionaffiche.component';
import { QuizStatisticsComponent } from '../pages/quiz-statistics/quiz-statistics.component';
import { CalendarComponent } from './calendar/calendar.component'; // Update path if necessary
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { QuizScheduleComponent } from '../pages/schedule-quiz/schedule-quiz.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';


@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    NbMenuModule.forRoot(),
    ReactiveFormsModule,

    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }), // Import ECharts
  ],
  declarations: [
    PagesComponent,
    StartQuizzComponent,
    QuizzComponent,
    SubmitQuizzComponent,
    QuizListComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuizafficheComponent,
    QuestionafficheComponent,
    QuizStatisticsComponent,
    CalendarComponent,
    QuizScheduleComponent,
    HomepageComponent
  ],
})
export class PagesModule {
}
