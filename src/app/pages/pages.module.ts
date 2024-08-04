import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { NgxEchartsModule } from 'ngx-echarts';
import { StartQuizzComponent } from '../pages/start-quizz/start-quizz.component';
import { QuizzComponent } from '../pages/quizz/quizz.component';
import { SubmitQuizzComponent } from './submit-quizz/submit-quizz.component';


@NgModule({
  imports: [
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
    SubmitQuizzComponent
  
  ],
})
export class PagesModule {
}
