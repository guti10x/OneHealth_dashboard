import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirestoreService } from '../../../core/services/firestore.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-predicitions',
  standalone: false,
  templateUrl: './predicitions.component.html',
  styleUrl: './predicitions.component.scss'
})
export class PredicitionsComponent implements OnInit {

  isBrowser = false;

  totalPredicitions : number | null = null;
  totalAnxietyPredicitionsDetected: number | null = null;
  linearRegressionAvg: { mse: number, r2: number } | null = null;
  averageAnxiety: number | null = null;

  predictionChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array.from({ length: 11 }, (_, i) => i.toString()), // niveles 0-10
    datasets: [{
      data: [],
      label: 'Frecuencia',
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      fill: true,
      tension: 0.3
    }]
  };

  predictionChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Distribución de Ansiedad Predicha'
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Nivel de Ansiedad' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Número de Ocurrencias' }
      }
    }
  };

  constructor(
    private firestoreService: FirestoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.firestoreService.linearRegressionAvg$.subscribe(data => {
      this.linearRegressionAvg = data;
    });

    this.firestoreService.averageAnxiety$.subscribe(data => {
      this.averageAnxiety = data;
    });

    this.firestoreService.numberPredictions$.subscribe(predictions => {
      this.totalPredicitions = predictions;
    });

    this.firestoreService.numberHighAnxietyPredictions$.subscribe(predictions => {
      this.totalAnxietyPredicitionsDetected = predictions;
    });

    this.firestoreService.predictionDistribution$.subscribe(distribution => {
      this.predictionChartData = {
        labels: Array.from({ length: 11 }, (_, i) => i.toString()),
        datasets: [{
          data: distribution,
          label: 'Frecuencia',
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true,
          tension: 0.3
        }]
      };
    });
  }
}
