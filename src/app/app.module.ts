/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbAccordionModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbStepperModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { FddComponent } from './pages/agile/fdd/fdd.component';
import { StepperComponent } from '../assets/stepper/stepper.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { QuizafficheComponent } from './pages/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from './pages/questionaffiche/questionaffiche.component';
import { StartQuizzComponent } from './pages/start-quizz/start-quizz.component';
import { QuizzComponent } from './pages/quizz/quizz.component';
import { SubmitQuizzComponent } from './pages/submit-quizz/submit-quizz.component';
import { QuizStatisticsComponent } from './pages/quiz-statistics/quiz-statistics.component';
import { CalendarComponent } from './pages/FullCalendar/FullCalendar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { QuizScheduleComponent } from './pages/schedule-quiz/schedule-quiz.component';



@NgModule({
  declarations: [AppComponent, StepperComponent,FddComponent, ConfirmationDialogComponent,
    QuizListComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuizafficheComponent,
    QuestionafficheComponent,
    StartQuizzComponent,
    QuizzComponent,
    SubmitQuizzComponent,
    QuizStatisticsComponent,
    CalendarComponent,
    QuizScheduleComponent,
    HomepageComponent
  ],
  imports: [
    NbStepperModule,
    NbAccordionModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {
}
