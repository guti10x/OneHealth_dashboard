import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-predicitions',
  standalone: false,
  templateUrl: './predicitions.component.html',
  styleUrl: './predicitions.component.scss'
})
export class PredicitionsComponent implements OnInit {

  linearRegressionAvg: { mse: number, r2: number } | null = null;
  predictionHistory: { date: string, prediction: number }[] = [];
  averageAnxiety: number | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.linearRegressionAvg$.subscribe(data => {
      this.linearRegressionAvg = data;
      console.log('Linear Regression Avg:', this.linearRegressionAvg);
    });

    this.firestoreService.averageAnxiety$.subscribe(data => {
      this.averageAnxiety = data;
      console.log('Average Anxiety:', this.averageAnxiety);
    });

    this.firestoreService.predictionHistory$.subscribe(data => {
      this.predictionHistory = data.map(item => ({
      date: item.timestamp,
      prediction: item.value
      }));
      console.log('Prediction History:', this.predictionHistory);
    });

  }
}