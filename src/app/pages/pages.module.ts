// import { BrowserModule } from '@angular/platform-browser';
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
import { CalendarComponent } from './calendar/calendar.component'; // Update path if necessary
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { NbStepperModule } from '@nebular/theme';

import { TaskManagementComponent } from '../pages/task-management/task-management.component';
import { TaskService } from '../service/task/task.service';
import { UserStoryService } from '../service/user-story/user-story.service';
//import { UserStoryManagementComponent } from './user-story-management/user-story-management.component';



import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    NbMenuModule.forRoot(),
    ReactiveFormsModule,
    NbStepperModule,
    FullCalendarModule,
    // BrowserModule,
    HttpClientModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }), 
    MatDialogModule,
    MatButtonModule,
    MatInputModule,

  ],
  declarations: [
    PagesComponent,
    StartQuizzComponent,
    QuizzComponent,
    SubmitQuizzComponent,
    //QuizListComponent,
    //CreateQuizComponent,
    //CreateQuestionComponent,
    //QuestionListComponent,
    //QuizafficheComponent,
    //QuestionafficheComponent,
    //QuizStatisticsComponent,
    CalendarComponent,
    //QuizScheduleComponent,
    HomepageComponent,
    TaskManagementComponent,
   // UserStoryManagementComponent,
  ],
 // providers: [TaskService, UserStoryService]
})
export class PagesModule {
}
