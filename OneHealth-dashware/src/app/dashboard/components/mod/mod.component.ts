import { Component } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mod',
  standalone: false,
  templateUrl: './mod.component.html',
  styleUrl: './mod.component.scss'
})
export class ModComponent {

  constructor(private firestoreService: FirestoreService) {}

  // Variables
  sadnessLevel!: number;
  maxAnxietyLevel!: number;
  happinessLevel!: number;
  avgEnergyLevel!: number;
  avgAnxietyLevel!: number;
  apathyLevel!: number;
  sadnessLevels = new Subject<number[]>();
  anxietyLevels = new Subject<number[]>();
  happinessLevels = new Subject<number[]>();
  energyLevels = new Subject<number[]>();
  apathyLevels = new Subject<number[]>();

  ngOnInit(): void {

    this.firestoreService.sadnessLevel$.subscribe(value => {
      this.sadnessLevel = value;
      console.log('sadnessLevel:', value);
    });

    this.firestoreService.maxAnxietyLevel$.subscribe(value => {
      this.maxAnxietyLevel = value;
      console.log('maxAnxietyLevel:', value);
    });

    this.firestoreService.happinessLevel$.subscribe(value => {
      this.happinessLevel = value;
      console.log('happinessLevel:', value);
    });

    this.firestoreService.avgEnergyLevel$.subscribe(value => {
      this.avgEnergyLevel = value;
      console.log('avgEnergyLevel:', value);
    });

    this.firestoreService.avgAnxietyLevel$.subscribe(value => {
      this.avgAnxietyLevel = value;
      console.log('avgAnxietyLevel:', value);
    });

    this.firestoreService.apathyLevel$.subscribe(value => {
      this.apathyLevel = value;
      console.log('apathyLevel:', value);
    });

    this.firestoreService.sadnessLevels$.subscribe(values => {
      this.sadnessLevels.next(values);
      console.log('sadnessLevels:', values);
    });

    this.firestoreService.anxietyLevels$.subscribe(values => {
      this.anxietyLevels.next(values);
      console.log('anxietyLevels:', values);
    });

    this.firestoreService.happinessLevels$.subscribe(values => {
      this.happinessLevels.next(values);
      console.log('happinessLevels:', values);
    });

    this.firestoreService.energyLevels$.subscribe(values => {
      this.energyLevels.next(values);
      console.log('energyLevels:', values);
    });

    this.firestoreService.apathyLevels$.subscribe(values => {
      this.apathyLevels.next(values);
      console.log('apathyLevels:', values);
    });    
  }
}
