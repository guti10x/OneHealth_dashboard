import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirestoreService } from '../../../core/services/firestore.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-global-sleep-stats',
  standalone: false,
  templateUrl: './global-sleep-stats.component.html',
  styleUrls: ['./global-sleep-stats.component.scss']
})
export class GlobalSleepStatsComponent implements OnInit {

  isBrowser: boolean;

  @ViewChild('sleepLevelChart') sleepLevelChart?: BaseChartDirective;

  averageRestLevel: number | null = null;
  averageSleepTime: Date | null = null;
  averageWakeUpTime: Date | null = null;
  avgSleepDuration: number | null = null;

  minSleepTime: Date | null = null;
  maxSleepTime: Date | null = null;
  minWakeUpTime: Date | null = null;
  maxWakeUpTime: Date | null = null;

  sleepLevelChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Nivel de Descanso',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  sleepTimeChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array(24).fill(''),
    datasets: [
      {
        label: 'Hora de Acostarse',
        data: Array(24).fill(0),
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  wakeUpTimeChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array(24).fill(''),
    datasets: [
      {
        label: 'Hora de Despertar',
        data: Array(24).fill(0),
        fill: true,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4
      }
    ]
  };

  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Niveles de Sueño' }
      },
      y: {
        title: { display: true, text: 'Ocurrencias' },
        beginAtZero: true
      }
    }
  };

  lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 23,
        ticks: {
          stepSize: 1,
          callback: (value: any) => this.formatTime(value)
        }
      }
    }
  };

  restLevelsSubject: any[] = [];
  sleepTimesSubject: Date[] = [];
  wakeUpTimesSubject: Date[] = [];

  constructor(
    private firestoreService: FirestoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  chartConfigs = {
    sleepLevelChart: {
      data: this.sleepLevelChartData,
      options: this.barChartOptions
    },
    sleepTimeChart: {
      data: this.sleepTimeChartData,
      options: this.lineChartOptions
    },
    wakeUpTimeChart: {
      data: this.wakeUpTimeChartData,
      options: this.lineChartOptions
    }
  };

  ngOnInit(): void {
    if (this.isBrowser) {
      this.firestoreService.averageRestLevel$.subscribe(value => {
        this.averageRestLevel = value;
        this.updateCharts();
      });

      this.firestoreService.averageSleepTime$.subscribe(value => {
        this.averageSleepTime = value;
      });

      this.firestoreService.averageWakeUpTime$.subscribe(value => {
        this.averageWakeUpTime = value;
      });

      this.firestoreService.avgSleepDuration$.subscribe(value => {
        this.avgSleepDuration = value;
      });

      this.firestoreService.sleepTimes$.subscribe(value => {
        this.sleepTimesSubject = value;
        this.updateMinMaxSleepTime();
        this.updateCharts();
      });

      this.firestoreService.wakeUpTimes$.subscribe(value => {
        this.wakeUpTimesSubject = value;
        this.updateMinMaxWakeUpTime();
        this.updateCharts();
      });

      this.firestoreService.restLevels$.subscribe(value => {
        this.restLevelsSubject = value;
        this.updateCharts();
      });
    }
  }

  updateCharts(): void {
    this.updateSleepLevelChart();
    this.updateSleepTimeChart();
    this.updateWakeUpTimeChart();
  }

  updateSleepLevelChart(): void {
    if (this.restLevelsSubject && this.restLevelsSubject.length > 0) {
      const levelOccurrences: { [key: number]: number } = {};
      this.restLevelsSubject.forEach(level => {
        levelOccurrences[level] = (levelOccurrences[level] || 0) + 1;
      });

      this.sleepLevelChartData.labels = Object.keys(levelOccurrences).map(key => `Nivel ${key}`);
      this.sleepLevelChartData.datasets[0].data = Object.values(levelOccurrences);
      this.sleepLevelChart?.update();
    }
  }

  updateSleepTimeChart(): void {
    const sleepHours = this.getTimeOccurrences(this.sleepTimesSubject);
    this.sleepTimeChartData.datasets[0].data = sleepHours;
  }

  updateWakeUpTimeChart(): void {
    const wakeUpHours = this.getTimeOccurrences(this.wakeUpTimesSubject);
    this.wakeUpTimeChartData.datasets[0].data = wakeUpHours;
  }

  getTimeOccurrences(times: Date[]): number[] {
    const hoursCount = Array(24).fill(0);
    times.forEach((time: Date) => {
      const hour = time.getHours();
      hoursCount[hour] += 1;
    });
    return hoursCount;
  }

  updateMinMaxSleepTime(): void {
    if (this.sleepTimesSubject.length > 0) {
      this.minSleepTime = new Date(Math.min(...this.sleepTimesSubject.map(t => t.getTime())));
      this.maxSleepTime = new Date(Math.max(...this.sleepTimesSubject.map(t => t.getTime())));
    } else {
      this.minSleepTime = null;
      this.maxSleepTime = null;
    }
  }

  updateMinMaxWakeUpTime(): void {
    if (this.wakeUpTimesSubject.length > 0) {
      this.minWakeUpTime = new Date(Math.min(...this.wakeUpTimesSubject.map(t => t.getTime())));
      this.maxWakeUpTime = new Date(Math.max(...this.wakeUpTimesSubject.map(t => t.getTime())));
    } else {
      this.minWakeUpTime = null;
      this.maxWakeUpTime = null;
    }
  }

  formatTime(value: number): string {
    return `${value}:00`;
  }
}
