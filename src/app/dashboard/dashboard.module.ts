import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderCardsComponent } from './components/header-cards/header-cards.component';
import { GlobalSleepStatsComponent } from './components/global-sleep-stats/global-sleep-stats.component';
import { AppUsageComponent } from './components/app-usage/app-usage.component';
import { BiometricsComponent } from './components/biometrics/biometrics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ModComponent } from './components/mod/mod.component';
import { LocationStadisticsComponent } from './components/location-stadistics/location-stadistics.component';
import { NgChartsModule } from 'ng2-charts';
import { PredicitionsComponent } from './components/predicitions/predicitions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderCardsComponent,
    GlobalSleepStatsComponent,
    AppUsageComponent,
    BiometricsComponent,
    ModComponent,
    LocationStadisticsComponent,
    PredicitionsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
