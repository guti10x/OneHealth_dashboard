import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirestoreService } from '../../../core/services/firestore.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-mod',
  standalone: false,
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss']
})
export class ModComponent {
  isBrowser: boolean;

  sadnessLevel!: number;
  maxAnxietyLevel!: number;
  happinessLevel!: number;
  avgEnergyLevel!: number;
  avgAnxietyLevel!: number;
  apathyLevel!: number;

  chartConfigs: {
    [key: string]: {
      data: ChartConfiguration<'bar'>['data'],
      options: ChartConfiguration<'bar'>['options'],
      average: number,
      min: number,
      max: number
    }
  } = {};

  sadnessAvg: number = 0;
  sadnessMin: number = 0;
  sadnessMax: number = 0;
  anxietyAvg: number = 0;
  anxietyMin: number = 0;
  anxietyMax: number = 0;
  happinessAvg: number = 0;
  happinessMin: number = 0;
  happinessMax: number = 0;
  energyAvg: number = 0;
  energyMin: number = 0;
  energyMax: number = 0;

  constructor(
    private firestoreService: FirestoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  

  ngOnInit(): void {
    this.firestoreService.sadnessLevel$.subscribe(val => this.sadnessLevel = val);
    this.firestoreService.maxAnxietyLevel$.subscribe(val => this.maxAnxietyLevel = val);
    this.firestoreService.happinessLevel$.subscribe(val => this.happinessLevel = val);
    this.firestoreService.avgEnergyLevel$.subscribe(val => this.avgEnergyLevel = val);
    this.firestoreService.avgAnxietyLevel$.subscribe(val => this.avgAnxietyLevel = val);
    this.firestoreService.apathyLevel$.subscribe(val => this.apathyLevel = val);

    if (this.isBrowser) {
      this.firestoreService.sadnessLevels$.subscribe(values => {
        this.chartConfigs['sadness'] = this.buildChart('Tristeza', values, '#EF5350');
        this.sadnessAvg = this.calculateAvg(values);
        this.sadnessMin = Math.min(...values);
        this.sadnessMax = Math.max(...values);
      });

      this.firestoreService.anxietyLevels$.subscribe(values => {
        this.chartConfigs['anxiety'] = this.buildChart('Ansiedad', values, '#FFA726');
        this.anxietyAvg = this.calculateAvg(values);
        this.anxietyMin = Math.min(...values);
        this.anxietyMax = Math.max(...values);
      });

      this.firestoreService.happinessLevels$.subscribe(values => {
        this.chartConfigs['happiness'] = this.buildChart('Felicidad', values, '#66BB6A');
        this.happinessAvg = this.calculateAvg(values);
        this.happinessMin = Math.min(...values);
        this.happinessMax = Math.max(...values);
      });

      this.firestoreService.energyLevels$.subscribe(values => {
        this.chartConfigs['energy'] = this.buildChart('Energía', values, '#42A5F5');
        this.energyAvg = this.calculateAvg(values);
        this.energyMin = Math.min(...values);
        this.energyMax = Math.max(...values);
      });

      this.firestoreService.apathyLevels$.subscribe(values => {
        this.chartConfigs['apathy'] = this.buildChart('Apatía', values, '#AB47BC');
      });
    }
  }

  private buildChart(label: string, values: number[], color: string) {
    const maxLevel = 10;
    const frequencies = Array(maxLevel + 1).fill(0);
    values.forEach(val => {
      if (val >= 0 && val <= maxLevel) {
        frequencies[val]++;
      }
    });

    return {
      data: {
        labels: frequencies.map((_, i) => `${i}`),
        datasets: [{
          data: frequencies,
          label: `Distribución de ${label}`,
          backgroundColor: color
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `Distribución de Niveles de ${label}`
          }
        },
        scales: {
          x: {
            title: { display: true, text: `Nivel de ${label}` }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'nº de casos' }
          }
        }
      },
      average: this.calculateAvg(values),
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }

  private calculateAvg(values: number[]): number {
    const sum = values.reduce((a, b) => a + b, 0);
    return values.length ? sum / values.length : 0;
  }
}
