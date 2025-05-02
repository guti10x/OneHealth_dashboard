import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-global-sleep-stats',
  standalone: false,
  templateUrl: './global-sleep-stats.component.html',
  styleUrls: ['./global-sleep-stats.component.scss']
})
export class GlobalSleepStatsComponent implements OnInit {

  constructor(private formulariosService: FirestoreService) {}

  // Overage variables
  averageRestLevel: number | null = null;
  averageSleepTime: Date | null = null;
  averageWakeUpTime: Date | null = null;
  avgSleepDuration: number | null = null;

  // All data variables
  restLevelsSubject: any[] = [];
  sleepTimesSubject: any[] = [];
  wakeUpTimesSubject: any[] = [];

  ngOnInit(): void {

    // Suscribirse a las variables y hacer console.log de cada valor
    this.formulariosService.averageRestLevel$.subscribe(value => {
      this.averageRestLevel = value;
      console.log('averageRestLevel:', value);
    });

    this.formulariosService.averageSleepTime$.subscribe(value => {
      this.averageSleepTime = value;
      console.log('averageSleepTime:', value);
    });

    this.formulariosService.averageWakeUpTime$.subscribe(value => {
      this.averageWakeUpTime = value;
      console.log('averageWakeUpTime:', value);
    });

    this.formulariosService.avgSleepDuration$.subscribe(value => {
      this.avgSleepDuration = value;
      console.log('avgSleepDuration:', value);
    });

    this.formulariosService.restLevels$.subscribe(value => {
      this.restLevelsSubject = value;
      console.log('restLevels:', value);
    });

    this.formulariosService.sleepTimes$.subscribe(value => {
      this.sleepTimesSubject = value;
      console.log('sleepTimes:', value);
    });

    this.formulariosService.wakeUpTimes$.subscribe(value => {
      this.wakeUpTimesSubject = value;
      console.log('wakeUpTimes:', value);
    });
  }
}
